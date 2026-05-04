#!/usr/bin/env python3
"""
atualizar_lattes.py
═══════════════════════════════════════════════════════════════════
Lê os arquivos XML exportados do Lattes de cada pesquisador
e atualiza automaticamente as seções PUBLICACOES, PROJETOS
e PATENTES do arquivo data.js.

COMO USAR:
  1. Cada pesquisador baixa o XML do Lattes:
       lattes.cnpq.br → Meu Currículo → Exportar XML
       (baixa um .zip — extraia o .xml de dentro)

  2. Renomeie os arquivos com o mesmo nome usado no campo
     "lattes_arquivo" no data.js (ex: "ana-silva.xml")
     e coloque na pasta  lattes/

  3. Execute este script:
       python atualizar_lattes.py

  4. O data.js será atualizado. Confira as mudanças e
     faça o commit no GitHub.

DEPENDÊNCIAS:  Python 3.8+  (sem bibliotecas externas)
═══════════════════════════════════════════════════════════════════
"""

import os
import re
import json
import glob
import zipfile
from datetime import datetime
from xml.etree import ElementTree as ET

LATTES_DIR  = "lattes"
DATA_JS     = "data.js"
ANO_MINIMO  = datetime.now().year - 6   # publicações dos últimos 6 anos

# ── Helpers ────────────────────────────────────────────────────────

def limpar(texto):
    """Remove espaços extras e normaliza encoding."""
    if not texto:
        return ""
    return " ".join(texto.strip().split())

def abreviar_autores(lista_autores, sobrenome_lab):
    """
    Formata lista de autores: Sobrenome, I.
    Destaca autores do laboratório em negrito (opcional).
    """
    formatados = []
    for a in lista_autores:
        nome = a.get("NOME-COMPLETO-DO-AUTOR", "") or a.get("NOME-PARA-CITACAO", "")
        if not nome:
            continue
        partes = nome.strip().split()
        if len(partes) >= 2:
            sobrenome = partes[-1]
            iniciais  = ". ".join(p[0] for p in partes[:-1] if p) + "."
            formatados.append(f"{sobrenome}, {iniciais}")
        else:
            formatados.append(nome)
    return "; ".join(formatados)

def carregar_xml(caminho):
    """Lê XML do Lattes (pode ser .xml direto ou .zip contendo .xml)."""
    if caminho.endswith(".zip"):
        with zipfile.ZipFile(caminho) as z:
            xmls = [f for f in z.namelist() if f.endswith(".xml")]
            if not xmls:
                return None
            with z.open(xmls[0]) as f:
                conteudo = f.read()
    else:
        with open(caminho, "rb") as f:
            conteudo = f.read()

    # Remove BOM e declarações problemáticas
    conteudo = conteudo.lstrip(b"\xef\xbb\xbf")
    try:
        return ET.fromstring(conteudo)
    except ET.ParseError as e:
        print(f"  ⚠️  Erro ao parsear XML: {e}")
        return None

# ── Extratores ─────────────────────────────────────────────────────

def extrair_info_pesquisador(root):
    dados = root.find("DADOS-GERAIS")
    if dados is None:
        return {}
    return {
        "nome":     limpar(dados.get("NOME-COMPLETO", "")),
        "lattes_id": limpar(root.get("NUMERO-IDENTIFICADOR", "")),
    }

def extrair_publicacoes(root, ano_minimo=ANO_MINIMO):
    """Extrai artigos publicados nos últimos anos."""
    pubs = []
    for artigo in root.iter("ARTIGO-PUBLICADO"):
        basico = artigo.find("DADOS-BASICOS-DO-ARTIGO")
        detalhe = artigo.find("DETALHAMENTO-DO-ARTIGO")
        if basico is None:
            continue
        try:
            ano = int(basico.get("ANO-DO-ARTIGO", "0") or "0")
        except ValueError:
            ano = 0
        if ano < ano_minimo:
            continue

        titulo  = limpar(basico.get("TITULO-DO-ARTIGO", ""))
        doi     = limpar(basico.get("DOI", ""))
        journal = limpar(detalhe.get("NOME-DO-PERIODICO", "")) if detalhe is not None else ""
        autores = abreviar_autores(list(artigo.iter("AUTORES")), "")

        venue = journal
        if doi:
            venue += f" · DOI: {doi}"

        pubs.append({
            "titulo":  titulo,
            "autores": autores,
            "veiculo": venue,
            "ano":     ano,
            "_fonte":  "lattes",
        })

    # Também extrai trabalhos em eventos (conferências)
    for trabalho in root.iter("TRABALHO-EM-EVENTOS"):
        basico = trabalho.find("DADOS-BASICOS-DO-TRABALHO")
        detalhe = trabalho.find("DETALHAMENTO-DO-TRABALHO")
        if basico is None:
            continue
        try:
            ano = int(basico.get("ANO-DO-TRABALHO", "0") or "0")
        except ValueError:
            ano = 0
        if ano < ano_minimo:
            continue

        titulo  = limpar(basico.get("TITULO-DO-TRABALHO", ""))
        evento  = limpar(detalhe.get("NOME-DO-EVENTO", "")) if detalhe is not None else ""
        autores = abreviar_autores(list(trabalho.iter("AUTORES")), "")

        pubs.append({
            "titulo":  titulo,
            "autores": autores,
            "veiculo": evento,
            "ano":     ano,
            "_fonte":  "lattes",
        })

    return pubs

def extrair_projetos(root):
    """
    Extrai projetos de pesquisa do Lattes.
    Tenta múltiplos caminhos XML pois a estrutura varia entre versões do Lattes.
    """
    projetos = []

    # O Lattes armazena projetos em diferentes tags dependendo da versão e tipo
    TAGS_PROJETO = [
        "PROJETO-DE-PESQUISA",
        "PROJETO-DE-EXTENSAO",
        "PROJETO-DE-DESENVOLVIMENTO",
    ]

    # Atributos possíveis para o nome do projeto (variam entre versões)
    ATRIBS_NOME = ["NOME-DO-PROJETO", "TITULO-DO-PROJETO", "NOME"]

    encontrados = 0
    for tag in TAGS_PROJETO:
        for proj in root.iter(tag):
            encontrados += 1
            # Tenta encontrar o nome em diferentes atributos
            nome = ""
            for atrib in ATRIBS_NOME:
                nome = limpar(proj.get(atrib, ""))
                if nome:
                    break
            if not nome:
                continue

            ano_inicio = limpar(proj.get("ANO-INICIO", ""))
            ano_fim    = limpar(proj.get("ANO-FIM", ""))
            situacao   = limpar(proj.get("SITUACAO", "")).upper()
            descricao  = limpar(
                proj.get("DESCRICAO-DO-PROJETO", "") or
                proj.get("DESCRICAO", "") or ""
            )

            # Monta período
            periodo = ano_inicio if ano_inicio else "?"
            em_andamento = (
                situacao == "EM_ANDAMENTO" or
                not ano_fim
            )
            if ano_fim and not em_andamento:
                periodo += f"–{ano_fim}"
            else:
                periodo += "–atual"

            natureza = limpar(proj.get("NATUREZA", "")).upper()
            if natureza == "DESENVOLVIMENTO":
                tipo = "rd"
            elif natureza == "ENSINO":
                tipo = "academic"
            else:
                tipo = "academic"  # PESQUISA e outros

            # Financiadores — tenta caminhos alternativos
            financiadores = []
            for fin in proj.iter("FINANCIADOR-DO-PROJETO"):
                inst = limpar(
                    fin.get("NOME-INSTITUICAO", "") or
                    fin.get("NOME-ORGAO-FINANCIADOR", "") or ""
                )
                if inst:
                    financiadores.append(inst)
            fomento = "; ".join(financiadores) if financiadores else "Não especificado"

            # Membros — tag correta no Lattes é INTEGRANTES-DO-PROJETO (plural)
            membros = []
            for m in proj.iter("INTEGRANTES-DO-PROJETO"):
                nome_m = limpar(
                    m.get("NOME-COMPLETO", "") or
                    m.get("NOME", "") or ""
                )
                papel = limpar(m.get("FLAG-RESPONSAVEL", ""))
                if nome_m:
                    sufixo = " (Coordenador)" if papel == "SIM" else ""
                    membros.append(nome_m + sufixo)

            status = "ongoing" if em_andamento else "completed"

            projetos.append({
                "nome":      nome,
                "tipo":      tipo,
                "status":    status,
                "periodo":   periodo,
                "descricao": descricao,
                "fomento":   fomento,
                "membros":   membros,
                "_fonte":    "lattes",
                "_tag":      tag,
            })

    if encontrados == 0:
        print("  ⚠️  Nenhuma tag de projeto encontrada no XML.")
        print("     Verifique se o currículo tem projetos cadastrados no Lattes.")
    else:
        print(f"  ℹ️  {encontrados} nós de projeto encontrados, {len(projetos)} com nome válido.")

    return projetos

def extrair_patentes(root):
    """Extrai patentes e registros."""
    patentes = []
    for pat in root.iter("PATENTE"):
        basico = pat.find("DADOS-BASICOS-DA-PATENTE")
        detalhe = pat.find("DETALHAMENTO-DA-PATENTE")
        if basico is None:
            continue

        titulo   = limpar(basico.get("TITULO", ""))
        ano      = limpar(basico.get("ANO-DESENVOLVIMENTO", ""))
        numero   = limpar(detalhe.get("NUMERO-REGISTRO-OU-PATENTE", "")) if detalhe else ""
        categoria = limpar(basico.get("CATEGORIA", "")).upper()

        status = "granted" if "CONCEDIDA" in categoria or "GRANTED" in categoria else "pending"

        patentes.append({
            "titulo":  titulo,
            "numero":  f"INPI {numero} · {ano}" if numero else ano,
            "status":  status,
            "_fonte":  "lattes",
        })
    return patentes

# ── Deduplicação ───────────────────────────────────────────────────

def deduplicar_publicacoes(lista):
    """Remove publicações duplicadas por título (insensível a case)."""
    vistas = set()
    resultado = []
    for p in lista:
        chave = re.sub(r'\W+', '', p["titulo"].lower())[:60]
        if chave and chave not in vistas:
            vistas.add(chave)
            resultado.append(p)
    return resultado

def deduplicar_projetos(lista):
    """Remove projetos duplicados por nome."""
    vistas = set()
    resultado = []
    for p in lista:
        chave = re.sub(r'\W+', '', p["nome"].lower())[:60]
        if chave and chave not in vistas:
            vistas.add(chave)
            resultado.append(p)
    return resultado

# ── Geração de JavaScript ──────────────────────────────────────────

def pub_to_js(p, indent=2):
    sp = " " * indent
    return (
        f"{sp}{{\n"
        f"{sp}  titulo:  {json.dumps(p['titulo'], ensure_ascii=False)},\n"
        f"{sp}  autores: {json.dumps(p['autores'], ensure_ascii=False)},\n"
        f"{sp}  veiculo: {json.dumps(p['veiculo'], ensure_ascii=False)},\n"
        f"{sp}  ano:     {p['ano']},\n"
        f"{sp}}}"
    )

def proj_to_js(p, idx, indent=2):
    sp = " " * indent
    pid = f"lattes-{idx+1}"
    equipe_js = json.dumps(p["membros"], ensure_ascii=False)
    tipo = p.get("tipo", "academic")
    return (
        f"{sp}{{\n"
        f"{sp}  id:        {json.dumps(pid, ensure_ascii=False)},\n"
        f"{sp}  titulo:    {json.dumps(p['nome'], ensure_ascii=False)},\n"
        f"{sp}  status:    {json.dumps(p['status'], ensure_ascii=False)},\n"
        f"{sp}  tipo:      {json.dumps(tipo, ensure_ascii=False)},\n"
        f"{sp}  periodo:   {json.dumps(p['periodo'], ensure_ascii=False)},\n"
        f"{sp}  resumo:    {json.dumps(p['descricao'][:200] if p['descricao'] else 'Descrição não disponível.', ensure_ascii=False)},\n"
        f"{sp}  descricao: {json.dumps(p['descricao'] or 'Descrição não disponível.', ensure_ascii=False)},\n"
        f"{sp}  pi:        \"Verificar\",\n"
        f"{sp}  fomento:   {json.dumps(p['fomento'], ensure_ascii=False)},\n"
        f"{sp}  progresso: 50,\n"
        f"{sp}  equipe:    {equipe_js},\n"
        f"{sp}  tags:      [],\n"
        f"{sp}  objetivos: [],\n"
        f"{sp}  metodologia: \"\",\n"
        f"{sp}  resultados: [],\n"
        f"{sp}  publicacoes: [],\n"
        f"{sp}}}"
    )

def pat_to_js(p, indent=2):
    sp = " " * indent
    emojis = {"granted": "🔬", "pending": "📋"}
    return (
        f"{sp}{{\n"
        f"{sp}  emoji:  \"{emojis.get(p['status'], '📄')}\",\n"
        f"{sp}  titulo: {json.dumps(p['titulo'], ensure_ascii=False)},\n"
        f"{sp}  numero: {json.dumps(p['numero'], ensure_ascii=False)},\n"
        f"{sp}  status: {json.dumps(p['status'], ensure_ascii=False)},\n"
        f"{sp}}}"
    )

# ── Atualização do data.js ─────────────────────────────────────────

def atualizar_bloco(conteudo_js, nome_const, novo_conteudo):
    """
    Substitui o array de uma constante no data.js.
    Usa contagem de colchetes para lidar com arrays aninhados.
    """
    # Encontra onde começa a constante
    inicio_re = re.compile(rf'const\s+{nome_const}\s*=\s*\[', re.MULTILINE)
    m = inicio_re.search(conteudo_js)
    if not m:
        print(f"  ⚠️  Não encontrei 'const {nome_const}' no data.js — bloco não atualizado.")
        return conteudo_js

    pos_abre = m.end() - 1   # posição do '[' de abertura
    profundidade = 0
    pos_fecha = -1

    # Percorre o texto contando colchetes para achar o ']' correspondente
    for i in range(pos_abre, len(conteudo_js)):
        c = conteudo_js[i]
        if c == '[':
            profundidade += 1
        elif c == ']':
            profundidade -= 1
            if profundidade == 0:
                # Verifica se é seguido de ';' (pode ter espaço/newline entre)
                resto = conteudo_js[i+1:i+5].lstrip()
                if resto.startswith(';'):
                    pos_fecha = i
                    break

    if pos_fecha == -1:
        print(f"  ⚠️  Não encontrei o fechamento do array '{nome_const}' — bloco não atualizado.")
        return conteudo_js

    # Acha o ';' após o ']'
    pos_semi = conteudo_js.index(';', pos_fecha)

    novo = (
        conteudo_js[:pos_abre + 1] +
        "\n" + novo_conteudo + "\n" +
        conteudo_js[pos_fecha:pos_semi + 1]
    )
    print(f"  ✅ Bloco '{nome_const}' atualizado com sucesso.")
    return novo

# ── Main ───────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  Atualizador Lattes → data.js")
    print("=" * 60)

    # Verifica se a pasta lattes/ existe
    if not os.path.isdir(LATTES_DIR):
        os.makedirs(LATTES_DIR)
        print(f"\n📁 Pasta '{LATTES_DIR}/' criada.")
        print("   Coloque os arquivos XML (ou ZIP) exportados do Lattes aqui.")
        print("   Nomeie-os como: nome-sobrenome.xml")
        return

    # Lê todos os XMLs
    arquivos = (
        glob.glob(os.path.join(LATTES_DIR, "*.xml")) +
        glob.glob(os.path.join(LATTES_DIR, "*.zip"))
    )

    if not arquivos:
        print(f"\n⚠️  Nenhum arquivo .xml ou .zip encontrado em '{LATTES_DIR}/'")
        print("   Baixe os XMLs do Lattes e coloque nessa pasta.")
        return

    todas_pubs     = []
    todos_projetos = []
    todas_patentes = []
    pesquisadores  = []

    for arq in sorted(arquivos):
        nome_arq = os.path.basename(arq)
        print(f"\n📄 Lendo {nome_arq}...")
        root = carregar_xml(arq)
        if root is None:
            continue

        info = extrair_info_pesquisador(root)
        print(f"   Pesquisador: {info.get('nome', '(não encontrado)')}")

        pubs = extrair_publicacoes(root)
        projs = extrair_projetos(root)
        pats = extrair_patentes(root)

        print(f"   Publicações (≥{ANO_MINIMO}): {len(pubs)}")
        print(f"   Projetos: {len(projs)}")
        print(f"   Patentes: {len(pats)}")

        todas_pubs.extend(pubs)
        todos_projetos.extend(projs)
        todas_patentes.extend(pats)
        pesquisadores.append(info)

    # Deduplica e ordena
    todas_pubs     = sorted(deduplicar_publicacoes(todas_pubs), key=lambda x: -x["ano"])
    todos_projetos = deduplicar_projetos(todos_projetos)
    todas_patentes = list({p["titulo"]: p for p in todas_patentes}.values())

    print(f"\n{'='*60}")
    print(f"  Total consolidado:")
    print(f"  • {len(todas_pubs)} publicações únicas")
    print(f"  • {len(todos_projetos)} projetos únicos")
    print(f"  • {len(todas_patentes)} patentes únicas")
    print(f"{'='*60}")

    # Lê o data.js atual
    if not os.path.exists(DATA_JS):
        print(f"\n❌ Arquivo '{DATA_JS}' não encontrado. Execute na raiz do projeto.")
        return

    with open(DATA_JS, "r", encoding="utf-8") as f:
        conteudo = f.read()

    # Gera os blocos JavaScript
    pubs_js = ",\n".join(pub_to_js(p) for p in todas_pubs)
    proj_js = ",\n".join(proj_to_js(p, i) for i, p in enumerate(todos_projetos))
    pat_js  = ",\n".join(pat_to_js(p) for p in todas_patentes)

    # Atualiza os blocos no data.js
    conteudo = atualizar_bloco(conteudo, "PUBLICACOES", pubs_js)
    conteudo = atualizar_bloco(conteudo, "PATENTES",    pat_js)
    conteudo = atualizar_bloco(conteudo, "PROJETOS",    proj_js)
    print(f"\n✅ Publicações, projetos e patentes atualizados no data.js.")

    # Salva o data.js atualizado
    # Faz backup primeiro
    backup = DATA_JS.replace(".js", f"_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.js")
    with open(backup, "w", encoding="utf-8") as f:
        f.write(conteudo)

    with open(DATA_JS, "w", encoding="utf-8") as f:
        f.write(conteudo)

    print(f"\n✅ data.js atualizado com sucesso!")
    print(f"   Backup salvo em: {backup}")
    print(f"\n⚠️  Lembre de:")
    print(f"   1. Revisar 'projetos_lattes.js' e copiar os projetos relevantes para data.js")
    print(f"   2. Conferir e ajustar os campos 'pi' (coordenador) e 'progresso' nos projetos")
    print(f"   3. Fazer commit no GitHub para o site atualizar")

if __name__ == "__main__":
    main()
