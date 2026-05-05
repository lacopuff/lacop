#!/usr/bin/env python3
"""
atualizar_lattes.py — versão 2.0
════════════════════════════════════════════════════════════════
Lê os XMLs exportados do Lattes de cada pesquisador e MESCLA
os dados no data.js, sem sobrescrever edições manuais.

ESTRATÉGIA:
  • Publicações e Patentes: substituição completa (sem edição manual)
  • Projetos: MESCLAGEM inteligente
      - Novos projetos do Lattes → adicionados ao data.js
      - Projetos já existentes   → campos manuais preservados
        (pi, progresso, tags, objetivos, metodologia, resultados)

COMO USAR:
  1. Coloque os XMLs (ou ZIPs) na pasta  lattes/
  2. Execute:  python atualizar_lattes.py
  3. Revise as mudanças e faça commit no GitHub

DEPENDÊNCIAS: Python 3.8+  (sem bibliotecas externas)
════════════════════════════════════════════════════════════════
"""

import os, re, json, glob, zipfile
from datetime import datetime
from xml.etree import ElementTree as ET

LATTES_DIR = "lattes"
DATA_JS    = "data.js"
ANO_MIN    = datetime.now().year - 6

def limpar(t):
    return " ".join((t or "").strip().split())

def chave_titulo(titulo):
    return re.sub(r'\W+', '', titulo.lower())[:60]

def abreviar_autores(lista):
    result = []
    for a in lista:
        n = a.get("NOME-COMPLETO-DO-AUTOR","") or a.get("NOME-PARA-CITACAO","")
        if not n: continue
        p = n.strip().split()
        result.append(f"{p[-1]}, {''.join(x[0]+'.' for x in p[:-1])}" if len(p)>1 else n)
    return "; ".join(result)

def carregar_xml(caminho):
    if caminho.endswith(".zip"):
        with zipfile.ZipFile(caminho) as z:
            xmls = [f for f in z.namelist() if f.endswith(".xml")]
            if not xmls: return None
            with z.open(xmls[0]) as f:
                conteudo = f.read()
    else:
        with open(caminho, "rb") as f:
            conteudo = f.read()
    conteudo = conteudo.lstrip(b"\xef\xbb\xbf")
    try:
        return ET.fromstring(conteudo)
    except ET.ParseError as e:
        print(f"  Erro ao parsear XML: {e}")
        return None

def extrair_info(root):
    d = root.find("DADOS-GERAIS")
    return {
        "nome": limpar(d.get("NOME-COMPLETO","")) if d is not None else "",
        "id":   limpar(root.get("NUMERO-IDENTIFICADOR",""))
    }

def extrair_publicacoes(root):
    pubs = []
    for artigo in root.iter("ARTIGO-PUBLICADO"):
        b = artigo.find("DADOS-BASICOS-DO-ARTIGO")
        d = artigo.find("DETALHAMENTO-DO-ARTIGO")
        if b is None: continue
        try: ano = int(b.get("ANO-DO-ARTIGO","0") or "0")
        except: ano = 0
        if ano < ANO_MIN: continue
        titulo  = limpar(b.get("TITULO-DO-ARTIGO",""))
        doi     = limpar(b.get("DOI",""))
        journal = limpar(d.get("NOME-DO-PERIODICO","")) if d is not None else ""
        autores = abreviar_autores(list(artigo.iter("AUTORES")))
        venue   = journal + (f" · DOI: {doi}" if doi else "")
        pubs.append({"titulo":titulo,"autores":autores,"veiculo":venue,"ano":ano,"tipo":"journal"})

    for trab in root.iter("TRABALHO-EM-EVENTOS"):
        b = trab.find("DADOS-BASICOS-DO-TRABALHO")
        d = trab.find("DETALHAMENTO-DO-TRABALHO")
        if b is None: continue
        try: ano = int(b.get("ANO-DO-TRABALHO","0") or "0")
        except: ano = 0
        if ano < ANO_MIN: continue
        titulo  = limpar(b.get("TITULO-DO-TRABALHO",""))
        evento  = limpar(d.get("NOME-DO-EVENTO","")) if d is not None else ""
        autores = abreviar_autores(list(trab.iter("AUTORES")))
        pubs.append({"titulo":titulo,"autores":autores,"veiculo":evento,"ano":ano,"tipo":"conference"})
    return pubs

def extrair_projetos(root, nome_pi=""):
    projetos = []
    TAGS_PROJ   = ["PROJETO-DE-PESQUISA","PROJETO-DE-EXTENSAO","PROJETO-DE-DESENVOLVIMENTO"]
    ATRIBS_NOME = ["NOME-DO-PROJETO","TITULO-DO-PROJETO","NOME"]
    for tag in TAGS_PROJ:
        for proj in root.iter(tag):
            nome = ""
            for a in ATRIBS_NOME:
                nome = limpar(proj.get(a,""))
                if nome: break
            if not nome: continue
            nat  = proj.get("NATUREZA","").upper()
            sit  = proj.get("SITUACAO","").upper()
            ai   = limpar(proj.get("ANO-INICIO",""))
            af   = limpar(proj.get("ANO-FIM",""))
            desc = limpar(proj.get("DESCRICAO-DO-PROJETO","") or proj.get("DESCRICAO","") or "")
            tipo = "rd" if nat == "DESENVOLVIMENTO" else "academic"
            em_andamento = (sit == "EM_ANDAMENTO" or not af)
            status  = "ongoing" if em_andamento else "completed"
            periodo = (ai or "?") + ("–atual" if em_andamento else f"–{af}")
            fins    = [limpar(f.get("NOME-INSTITUICAO",""))
                       for f in proj.iter("FINANCIADOR-DO-PROJETO") if f.get("NOME-INSTITUICAO")]
            fomento = "; ".join(fins) if fins else "Não especificado"
            membros = []
            for m in proj.iter("INTEGRANTES-DO-PROJETO"):
                nm = limpar(m.get("NOME-COMPLETO","") or m.get("NOME",""))
                if nm: membros.append(nm + (" (Coordenador)" if m.get("FLAG-RESPONSAVEL")=="SIM" else ""))
            projetos.append({"nome":nome,"tipo":tipo,"status":status,"periodo":periodo,
                             "desc":desc,"fomento":fomento,"membros":membros,"pi_sugerido":nome_pi})
    return projetos

def extrair_patentes(root):
    pats = []
    for pat in root.iter("PATENTE"):
        b = pat.find("DADOS-BASICOS-DA-PATENTE")
        d = pat.find("DETALHAMENTO-DA-PATENTE")
        if b is None: continue
        titulo = limpar(b.get("TITULO",""))
        ano    = limpar(b.get("ANO-DESENVOLVIMENTO",""))
        num    = limpar(d.get("NUMERO-REGISTRO-OU-PATENTE","")) if d else ""
        cat    = b.get("CATEGORIA","").upper()
        status = "granted" if ("CONCEDIDA" in cat or "GRANTED" in cat) else "pending"
        pats.append({"titulo":titulo,"numero":f"INPI {num} · {ano}" if num else ano,"status":status})
    return pats

def extrair_array_js(conteudo, nome_const):
    m = re.compile(rf'const\s+{nome_const}\s*=\s*\[', re.MULTILINE).search(conteudo)
    if not m: return None, -1, -1
    pos_abre = m.end() - 1
    prof = 0
    for i in range(pos_abre, len(conteudo)):
        c = conteudo[i]
        if c == '[': prof += 1
        elif c == ']':
            prof -= 1
            if prof == 0 and conteudo[i+1:i+5].lstrip().startswith(';'):
                return conteudo[pos_abre+1:i], pos_abre, i
    return None, -1, -1

def substituir_bloco(conteudo, nome_const, novo):
    m = re.compile(rf'const\s+{nome_const}\s*=\s*\[', re.MULTILINE).search(conteudo)
    if not m:
        print(f"  Aviso: '{nome_const}' nao encontrado.")
        return conteudo
    pos_abre = m.end() - 1
    prof = 0
    pos_fecha = -1
    for i in range(pos_abre, len(conteudo)):
        c = conteudo[i]
        if c == '[': prof += 1
        elif c == ']':
            prof -= 1
            if prof == 0 and conteudo[i+1:i+5].lstrip().startswith(';'):
                pos_fecha = i; break
    if pos_fecha == -1: return conteudo
    pos_semi = conteudo.index(';', pos_fecha)
    print(f"  OK '{nome_const}' atualizado.")
    return conteudo[:pos_abre+1] + "\n" + novo + "\n" + conteudo[pos_fecha:pos_semi+1]

def adicionar_const(conteudo, nome_const, bloco):
    conteudo = conteudo.rstrip()
    conteudo += f"\n\nconst {nome_const} = [\n{bloco}\n];\n"
    print(f"  OK '{nome_const}' adicionado.")
    return conteudo

def pub_to_js(p):
    return (f"  {{\n"
            f"    titulo:  {json.dumps(p['titulo'], ensure_ascii=False)},\n"
            f"    autores: {json.dumps(p['autores'], ensure_ascii=False)},\n"
            f"    veiculo: {json.dumps(p['veiculo'], ensure_ascii=False)},\n"
            f"    ano:     {p['ano']},\n"
            f"    tipo:    \"{p.get('tipo','journal')}\",\n"
            f"  }}")

def proj_to_js(p, pid):
    resumo = p['desc'][:200] if p['desc'] else "Descricao nao disponivel."
    return (f"  {{\n"
            f"    id:          {json.dumps(pid, ensure_ascii=False)},\n"
            f"    titulo:      {json.dumps(p['nome'], ensure_ascii=False)},\n"
            f"    status:      {json.dumps(p['status'], ensure_ascii=False)},\n"
            f"    tipo:        {json.dumps(p['tipo'], ensure_ascii=False)},\n"
            f"    periodo:     {json.dumps(p['periodo'], ensure_ascii=False)},\n"
            f"    resumo:      {json.dumps(resumo, ensure_ascii=False)},\n"
            f"    descricao:   {json.dumps(p['desc'] or resumo, ensure_ascii=False)},\n"
            f"    pi:          {json.dumps(p.get('pi_sugerido','Verificar'), ensure_ascii=False)},\n"
            f"    fomento:     {json.dumps(p['fomento'], ensure_ascii=False)},\n"
            f"    progresso:   50,\n"
            f"    equipe:      {json.dumps(p['membros'], ensure_ascii=False)},\n"
            f"    tags:        [],\n"
            f"    objetivos:   [],\n"
            f"    metodologia: \"\",\n"
            f"    resultados:  [],\n"
            f"    publicacoes: [],\n"
            f"  }}")

def pat_to_js(p):
    e = {"granted":"🔬","pending":"📋"}.get(p['status'],'📄')
    return (f"  {{\n"
            f"    emoji:  \"{e}\",\n"
            f"    titulo: {json.dumps(p['titulo'], ensure_ascii=False)},\n"
            f"    numero: {json.dumps(p['numero'], ensure_ascii=False)},\n"
            f"    status: {json.dumps(p['status'], ensure_ascii=False)},\n"
            f"  }}")

def main():
    print("=" * 60)
    print("  Atualizador Lattes -> data.js  (v2.0 — mesclagem)")
    print("=" * 60)

    if not os.path.isdir(LATTES_DIR):
        os.makedirs(LATTES_DIR)
        print(f"\nPasta '{LATTES_DIR}/' criada. Coloque os XMLs la e execute novamente.")
        return

    arquivos = glob.glob(os.path.join(LATTES_DIR,"*.xml")) + glob.glob(os.path.join(LATTES_DIR,"*.zip"))
    if not arquivos:
        print(f"\nNenhum XML/ZIP em '{LATTES_DIR}/'")
        return

    todas_pubs, todos_projs, todas_pats = [], [], []
    vistas_pub, vistas_proj = set(), set()

    for arq in sorted(arquivos):
        print(f"\nLendo {os.path.basename(arq)}...")
        root = carregar_xml(arq)
        if root is None: continue
        info    = extrair_info(root)
        nome_pi = info.get("nome","Verificar")
        print(f"  Pesquisador: {nome_pi}")

        pubs  = extrair_publicacoes(root)
        projs = extrair_projetos(root, nome_pi)
        pats  = extrair_patentes(root)

        novas_pubs = [p for p in pubs  if (c:=chave_titulo(p["titulo"])) and c not in vistas_pub  and not vistas_pub.add(c)]
        novos_projs= [p for p in projs if (c:=chave_titulo(p["nome"]))   and c not in vistas_proj and not vistas_proj.add(c)]

        print(f"  Publicacoes: {len(novas_pubs)} novas (de {len(pubs)} lidas)")
        print(f"  Projetos:    {len(novos_projs)} novos (de {len(projs)} lidos)")
        print(f"  Patentes:    {len(pats)}")
        todas_pubs.extend(novas_pubs)
        todos_projs.extend(novos_projs)
        todas_pats.extend(pats)

    todas_pubs = sorted(todas_pubs, key=lambda x: -x["ano"])
    todas_pats = list({p["titulo"]: p for p in todas_pats}.values())

    print(f"\n{'='*60}")
    print(f"  Consolidado: {len(todas_pubs)} pubs, {len(todos_projs)} projetos, {len(todas_pats)} patentes")
    print(f"{'='*60}")

    if not os.path.exists(DATA_JS):
        print(f"\nArquivo '{DATA_JS}' nao encontrado.")
        return

    with open(DATA_JS, "r", encoding="utf-8") as f:
        conteudo = f.read()

    # Publicacoes: substitui completo
    pubs_js = ",\n".join(pub_to_js(p) for p in todas_pubs)
    conteudo = substituir_bloco(conteudo, "PUBLICACOES", pubs_js) if "const PUBLICACOES" in conteudo else adicionar_const(conteudo, "PUBLICACOES", pubs_js)

    # Patentes: substitui completo
    pats_js = ",\n".join(pat_to_js(p) for p in todas_pats)
    conteudo = substituir_bloco(conteudo, "PATENTES", pats_js) if "const PATENTES" in conteudo else adicionar_const(conteudo, "PATENTES", pats_js)

    # Projetos: MESCLAGEM — preserva os existentes, adiciona apenas os novos
    bloco_atual, _, _ = extrair_array_js(conteudo, "PROJETOS")
    chaves_existentes = set()
    if bloco_atual:
        titulos_atuais   = re.findall(r'titulo:\s*["\'](.+?)["\'],', bloco_atual)
        chaves_existentes= {chave_titulo(t) for t in titulos_atuais}
        print(f"\n  Projetos ja no data.js: {len(chaves_existentes)}")

    novos = [p for p in todos_projs if chave_titulo(p["nome"]) not in chaves_existentes]
    print(f"  Projetos novos a adicionar: {len(novos)}")

    if novos:
        ids_num = [int(x) for x in re.findall(r'id:\s*["\']p(\d+)["\']', bloco_atual or "") if x.isdigit()]
        prox_id = (max(ids_num) + 1) if ids_num else 1
        novos_js = ",\n".join(proj_to_js(p, f"p{prox_id+i}") for i,p in enumerate(novos))
        bloco_final = ((bloco_atual or "").strip().rstrip(",") + ",\n" + novos_js) if bloco_atual else novos_js
        conteudo = substituir_bloco(conteudo, "PROJETOS", bloco_final) if "const PROJETOS" in conteudo else adicionar_const(conteudo, "PROJETOS", bloco_final)
    else:
        print("  Nenhum projeto novo — PROJETOS nao alterado.")

    # Backup + salva
    backup = DATA_JS.replace(".js", f"_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.js")
    with open(backup, "w", encoding="utf-8") as f, open(DATA_JS, "r", encoding="utf-8") as g:
        f.write(g.read())
    with open(DATA_JS, "w", encoding="utf-8") as f:
        f.write(conteudo)

    print(f"\ndata.js atualizado! Backup em: {backup}")
    if novos:
        print(f"\nRevise os {len(novos)} projetos novos no data.js:")
        print("  - Ajuste 'progresso', 'tags', 'objetivos', 'metodologia'")

if __name__ == "__main__":
    main()
