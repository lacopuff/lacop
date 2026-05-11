#!/usr/bin/env python3
"""
gerenciar_projetos.py
App Streamlit para gerenciar o portfólio do laboratório.
Edita apenas campos manuais (foto, timeline, progresso, tags, links).
Campos do Lattes (título, equipe, fomento) não são alterados aqui.

INSTALAÇÃO:
  pip install streamlit

EXECUÇÃO (na pasta do repositório):
  streamlit run gerenciar_projetos.py
"""

import streamlit as st
import re, shutil, subprocess
from pathlib import Path
from datetime import datetime

st.set_page_config(page_title="Gerenciador — Portfólio Lab", page_icon="🔬", layout="wide")

DATA_JS   = Path("data.js")
FOTOS_DIR = Path("fotos")

# ═══════════════════════════════════════════════════════
#  PARSER DO data.js
# ═══════════════════════════════════════════════════════

def extrair_bloco_array(conteudo, nome_const):
    """Extrai conteúdo bruto de um array JS (const X = [...])."""
    m = re.search(rf'const\s+{nome_const}\s*=\s*\[', conteudo, re.MULTILINE)
    if not m:
        return ""
    pos = m.end() - 1
    prof = 0
    for i in range(pos, len(conteudo)):
        c = conteudo[i]
        if c == '[':
            prof += 1
        elif c == ']':
            prof -= 1
            if prof == 0:
                return conteudo[pos + 1:i]
    return ""


def extrair_objetos_nivel0(texto):
    """Extrai { ... } de nível 0 de um array JS."""
    objetos = []
    prof, start = 0, -1
    for i, c in enumerate(texto):
        if c == '{' and prof == 0:
            prof, start = 1, i
        elif c == '{':
            prof += 1
        elif c == '}':
            prof -= 1
            if prof == 0 and start >= 0:
                objetos.append(texto[start:i + 1])
                start = -1
    return objetos


def get_str(text, name, default=""):
    m = re.search(rf'{name}:\s*"((?:[^"\\]|\\.)*)"', text)
    return m.group(1).replace('\\"', '"') if m else default


def get_int(text, name, default=0):
    m = re.search(rf'{name}:\s*(\d+)', text)
    return int(m.group(1)) if m else default


def get_bool(text, name, default=False):
    m = re.search(rf'{name}:\s*(true|false)', text)
    return m.group(1) == 'true' if m else default


def extrair_array_interno(text, name):
    """Extrai [ ... ] de um campo dentro de um objeto."""
    m = re.search(rf'{name}:\s*\[', text)
    if not m:
        return ""
    start = m.end() - 1
    prof = 0
    for i in range(start, len(text)):
        c = text[i]
        if c == '[':
            prof += 1
        elif c == ']':
            prof -= 1
            if prof == 0:
                return text[start + 1:i]
    return ""


def parse_foto_destaque(text):
    m = re.search(r'foto_destaque:\s*\{([^}]+)\}', text, re.DOTALL)
    if not m:
        return None
    t = m.group(1)
    return {"src": get_str(t, "src"), "legenda": get_str(t, "legenda")}


def parse_imagens(text):
    imgs = []
    for obj in extrair_objetos_nivel0(text):
        src = get_str(obj, "src")
        if src:
            imgs.append({"src": src, "legenda": get_str(obj, "legenda")})
    return imgs


def parse_marcos(text):
    bloco = extrair_array_interno(text, "marcos")
    if not bloco:
        return []
    marcos = []
    for obj in extrair_objetos_nivel0(bloco):
        imgs_bloco = extrair_array_interno(obj, "imagens")
        imagens    = parse_imagens(imgs_bloco) if imgs_bloco else []
        marcos.append({
            "data":      get_str(obj, "data"),
            "titulo":    get_str(obj, "titulo"),
            "texto":     get_str(obj, "texto"),
            "concluido": get_bool(obj, "concluido"),
            "imagens":   imagens,
        })
    return marcos


def parse_links(text):
    bloco = extrair_array_interno(text, "links")
    if not bloco:
        return []
    links = []
    for obj in extrair_objetos_nivel0(bloco):
        url = get_str(obj, "url")
        if url:
            links.append({
                "icone": get_str(obj, "icone", "🔗"),
                "label": get_str(obj, "label"),
                "url":   url,
            })
    return links


def parse_tags(text):
    bloco = extrair_array_interno(text, "tags")
    if not bloco:
        return []
    return re.findall(r'"([^"]*)"', bloco)


def carregar_projetos():
    if not DATA_JS.exists():
        return []
    with open(DATA_JS, encoding="utf-8") as f:
        conteudo = f.read()
    bloco = extrair_bloco_array(conteudo, "PROJETOS")
    projetos = []
    for obj in extrair_objetos_nivel0(bloco):
        pid = get_str(obj, "id")
        titulo = get_str(obj, "titulo")
        if not pid or not titulo:
            continue
        projetos.append({
            "id":            pid,
            "titulo":        titulo,
            "status":        get_str(obj, "status", "ongoing"),
            "tipo":          get_str(obj, "tipo", "academic"),
            "periodo":       get_str(obj, "periodo"),
            "resumo":        get_str(obj, "resumo"),
            "pi":            get_str(obj, "pi"),
            "fomento":       get_str(obj, "fomento"),
            "progresso":     get_int(obj, "progresso", 50),
            "tags":          parse_tags(obj),
            "foto_destaque": parse_foto_destaque(obj),
            "marcos":        parse_marcos(obj),
            "links":         parse_links(obj),
        })
    return projetos


# ═══════════════════════════════════════════════════════
#  SERIALIZAÇÃO PARA JS
# ═══════════════════════════════════════════════════════

def esc(s):
    return str(s).replace('\\', '\\\\').replace('"', '\\"')


def foto_to_js(foto, ind="    "):
    if not foto or not foto.get("src"):
        return None
    return (f'{ind}foto_destaque: {{\n'
            f'{ind}  src:     "{esc(foto["src"])}",\n'
            f'{ind}  legenda: "{esc(foto.get("legenda",""))}",\n'
            f'{ind}}}')


def marco_to_js(m, ind="      "):
    texto_js = f',\n{ind}texto:     "{esc(m.get("texto",""))}"' if m.get("texto") else ""
    conc_js  = "true" if m.get("concluido") else "false"
    imgs = m.get("imagens", [])
    if imgs:
        imgs_items = ",\n".join(
            f'{ind}  {{ src: "{esc(i["src"])}", legenda: "{esc(i.get("legenda",""))}" }}'
            for i in imgs
        )
        imgs_js = f',\n{ind}imagens: [\n{imgs_items},\n{ind}]'
    else:
        imgs_js = ""
    return (f'{ind}{{\n'
            f'{ind}  data:      "{esc(m.get("data",""))}",'
            f'\n{ind}  titulo:    "{esc(m.get("titulo",""))}",'
            f'{texto_js}'
            f'\n{ind}  concluido: {conc_js}'
            f'{imgs_js},'
            f'\n{ind}}}')


def marcos_to_js(marcos, ind="    "):
    if not marcos:
        return f'{ind}marcos: []'
    items = ",\n".join(marco_to_js(m) for m in marcos)
    return f'{ind}marcos: [\n{items},\n{ind}]'


def tags_to_js(tags, ind="    "):
    items = ", ".join(f'"{esc(t)}"' for t in tags)
    return f'{ind}tags: [{items}]'


def links_to_js(links, ind="    "):
    if not links:
        return f'{ind}links: []'
    items = ",\n".join(
        f'{ind}  {{ icone: "{esc(l.get("icone","🔗"))}", label: "{esc(l["label"])}", url: "{esc(l["url"])}" }}'
        for l in links
    )
    return f'{ind}links: [\n{items},\n{ind}]'


# ═══════════════════════════════════════════════════════
#  SALVAMENTO NO data.js
# ═══════════════════════════════════════════════════════

def encontrar_projeto_no_js(conteudo, proj_id):
    """Retorna (start, end) do bloco { } do projeto no conteúdo JS."""
    m = re.search(rf'id:\s*"{re.escape(proj_id)}"', conteudo)
    if not m:
        return -1, -1
    # Volta até encontrar o { de abertura do projeto
    start = conteudo.rfind('{', 0, m.start())
    if start == -1:
        return -1, -1
    prof = 0
    for i in range(start, len(conteudo)):
        c = conteudo[i]
        if c == '{':
            prof += 1
        elif c == '}':
            prof -= 1
            if prof == 0:
                return start, i
    return -1, -1


def substituir_campo_array(proj_text, nome, novo_js):
    """Substitui ou insere um campo de array dentro do texto do projeto."""
    m = re.search(rf'{nome}:\s*\[', proj_text)
    if m:
        start_arr = m.start()
        pos_abre  = m.end() - 1
        prof      = 0
        for i in range(pos_abre, len(proj_text)):
            c = proj_text[i]
            if c == '[':
                prof += 1
            elif c == ']':
                prof -= 1
                if prof == 0:
                    return proj_text[:start_arr] + novo_js + proj_text[i + 1:]
    # Insere antes do } final
    return proj_text[:-1] + f'  {novo_js},\n}}'


def substituir_campo_objeto(proj_text, nome, novo_js):
    """Substitui ou insere um campo de objeto dentro do texto do projeto."""
    m = re.search(rf'{nome}:\s*\{{', proj_text)
    if m:
        start_obj = m.start()
        pos_abre  = m.end() - 1
        prof      = 0
        for i in range(pos_abre, len(proj_text)):
            c = proj_text[i]
            if c == '{':
                prof += 1
            elif c == '}':
                prof -= 1
                if prof == 0:
                    return proj_text[:start_obj] + novo_js + proj_text[i + 1:]
    return proj_text[:-1] + f'  {novo_js},\n}}'


def salvar_campos(proj_id, campos):
    with open(DATA_JS, encoding="utf-8") as f:
        conteudo = f.read()

    start, end = encontrar_projeto_no_js(conteudo, proj_id)
    if start == -1:
        return False, "Projeto não encontrado no data.js"

    proj_text = conteudo[start:end + 1]

    # resumo
    if "resumo" in campos:
        proj_text = re.sub(
            r'resumo:\s*"(?:[^"\\]|\\.)*"',
            f'resumo: "{esc(campos["resumo"])}"',
            proj_text
        )

    # progresso
    if "progresso" in campos:
        proj_text = re.sub(r'progresso:\s*\d+', f'progresso: {campos["progresso"]}', proj_text)

    # tags
    if "tags" in campos:
        novo = tags_to_js(campos["tags"], "    ")
        proj_text = substituir_campo_array(proj_text, "tags", novo)

    # foto_destaque
    if "foto_destaque" in campos:
        foto = campos["foto_destaque"]
        if foto and foto.get("src"):
            novo = foto_to_js(foto)
            proj_text = substituir_campo_objeto(proj_text, "foto_destaque", novo)
        else:
            # Remove foto_destaque
            proj_text = re.sub(r'\s*foto_destaque:\s*\{[^}]*\},?', '', proj_text, flags=re.DOTALL)

    # marcos
    if "marcos" in campos:
        novo = marcos_to_js(campos["marcos"], "    ")
        proj_text = substituir_campo_array(proj_text, "marcos", novo)
        if "marcos:" not in proj_text:
            proj_text = proj_text[:-1] + f'  {novo},\n}}'

    # links
    if "links" in campos:
        novo = links_to_js(campos["links"], "    ")
        proj_text = substituir_campo_array(proj_text, "links", novo)
        if "links:" not in proj_text:
            proj_text = proj_text[:-1] + f'  {novo},\n}}'

    # Backup e salva
    bk = DATA_JS.parent / f"data_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.js"
    shutil.copy(DATA_JS, bk)

    novo_conteudo = conteudo[:start] + proj_text + conteudo[end + 1:]
    with open(DATA_JS, "w", encoding="utf-8") as f:
        f.write(novo_conteudo)

    return True, str(bk)


def salvar_foto_arquivo(uploaded_file, proj_id, subpasta=""):
    pasta = FOTOS_DIR / proj_id / subpasta if subpasta else FOTOS_DIR / proj_id
    pasta.mkdir(parents=True, exist_ok=True)
    nome = re.sub(r'[^\w\-_.]', '_', uploaded_file.name)
    caminho = pasta / nome
    with open(caminho, "wb") as f:
        f.write(uploaded_file.getbuffer())
    return str(caminho).replace("\\", "/")


def git_commit_push(mensagem):
    try:
        subprocess.run(["git", "add", "data.js", "fotos/"], capture_output=True)
        r_commit = subprocess.run(["git", "commit", "-m", mensagem], capture_output=True, text=True)
        out = (r_commit.stdout or "") + (r_commit.stderr or "")
        if "nothing to commit" in out:
            return True, "Nenhuma alteração para publicar."
        r_push = subprocess.run(["git", "push"], capture_output=True, text=True)
        return r_push.returncode == 0, r_push.stderr or r_push.stdout or "OK"
    except Exception as e:
        return False, str(e)


# ═══════════════════════════════════════════════════════
#  INTERFACE STREAMLIT
# ═══════════════════════════════════════════════════════

def main():
    st.markdown("""
    <style>
    .block-container { padding-top: 1.2rem; }
    div[data-testid="stSidebarContent"] { padding-top: 0.5rem; }
    </style>
    """, unsafe_allow_html=True)

    if not DATA_JS.exists():
        st.error(f"❌ `{DATA_JS}` não encontrado. Execute na pasta do repositório.")
        st.code("streamlit run gerenciar_projetos.py")
        return

    projetos = carregar_projetos()
    if not projetos:
        st.error("Nenhum projeto encontrado no data.js")
        return

    # ── Sidebar ───────────────────────────────────────────────
    with st.sidebar:
        st.markdown("## 🔬 Portfólio Lab")
        st.caption(f"{len(projetos)} projetos · apenas campos manuais")
        st.divider()

        filtro = st.radio("Filtrar", ["Todos", "Em andamento", "Concluídos"], horizontal=True, label_visibility="collapsed")
        busca  = st.text_input("🔍 Buscar projeto", placeholder="Nome...", label_visibility="collapsed")

        lista = projetos
        if filtro == "Em andamento":
            lista = [p for p in lista if p["status"] == "ongoing"]
        elif filtro == "Concluídos":
            lista = [p for p in lista if p["status"] == "completed"]
        if busca:
            lista = [p for p in lista if busca.lower() in p["titulo"].lower()]

        if "proj_id" not in st.session_state:
            st.session_state.proj_id = lista[0]["id"] if lista else None

        for p in lista:
            icon = "🟢" if p["status"] == "ongoing" else "✅"
            tipo = " · P&D" if p["tipo"] == "rd" else ""
            label = f"{icon} {p['titulo'][:42]}{'…' if len(p['titulo'])>42 else ''}\n`{p['periodo']}{tipo}`"
            sel   = p["id"] == st.session_state.proj_id
            if st.button(label, key=f"sb_{p['id']}", use_container_width=True,
                         type="primary" if sel else "secondary"):
                st.session_state.proj_id = p["id"]
                # Limpa estado dos marcos ao trocar de projeto
                for k in list(st.session_state.keys()):
                    if k.startswith("marcos_"):
                        del st.session_state[k]
                st.rerun()

    # ── Área principal ────────────────────────────────────────
    proj = next((p for p in projetos if p["id"] == st.session_state.proj_id), None)
    if not proj:
        st.info("Selecione um projeto na barra lateral.")
        return

    c1, c2 = st.columns([5, 1])
    with c1:
        st.markdown(f"## {proj['titulo']}")
        st.caption(f"`{proj['id']}` · {proj['periodo']} · {proj['pi']} · {proj['fomento']}")
    with c2:
        st.markdown(f"<div style='padding-top:1.4rem'>{'🟢 Em andamento' if proj['status']=='ongoing' else '✅ Concluído'}</div>", unsafe_allow_html=True)

    st.info("✏️ Edite apenas os campos manuais abaixo. Título, equipe e fomento vêm do Lattes e são preservados.", icon="ℹ️")

    tab1, tab2, tab3 = st.tabs(["📷  Foto & Resumo", "📅  Linha do Tempo", "🏷️  Tags & Links"])

    # ──────────────────────────────────────────────────────────
    # TAB 1 — Foto & Resumo
    # ──────────────────────────────────────────────────────────
    with tab1:
        col1, col2 = st.columns(2)

        with col1:
            st.markdown("**Foto de destaque** — aparece ao lado do resumo")
            foto_atual = proj.get("foto_destaque")
            foto_src   = foto_atual.get("src", "") if foto_atual else ""

            if foto_src and Path(foto_src).exists():
                st.image(foto_src, caption=foto_atual.get("legenda",""), use_container_width=True)
                remover_foto = st.checkbox("🗑️ Remover foto atual")
            else:
                if foto_src:
                    st.warning(f"Foto configurada mas não encontrada: `{foto_src}`")
                else:
                    st.markdown("*Nenhuma foto definida*")
                remover_foto = False

            foto_up  = st.file_uploader("📤 Nova foto", type=["jpg","jpeg","png","webp"], key=f"fup_{proj['id']}")
            legenda  = st.text_input("Legenda", value=foto_atual.get("legenda","") if foto_atual else "",
                                     placeholder="Ex: Bancada BOTDA — Lab. UFRRJ")

        with col2:
            st.markdown("**Resumo** — texto curto exibido no card do projeto")
            resumo = st.text_area("Resumo", value=proj.get("resumo",""), height=110, label_visibility="collapsed")

            st.markdown("**Progresso**")
            progresso = st.slider("", 0, 100, value=proj.get("progresso", 50),
                                  format="%d%%", key=f"prog_{proj['id']}")

        if st.button("💾 Salvar Foto & Resumo", type="primary"):
            campos = {"resumo": resumo, "progresso": progresso}
            if remover_foto:
                campos["foto_destaque"] = {"src": "", "legenda": ""}
            elif foto_up:
                src = salvar_foto_arquivo(foto_up, proj["id"])
                campos["foto_destaque"] = {"src": src, "legenda": legenda}
            elif legenda != (foto_atual.get("legenda","") if foto_atual else ""):
                campos["foto_destaque"] = {"src": foto_src, "legenda": legenda}

            ok, msg = salvar_campos(proj["id"], campos)
            st.success("✅ Salvo!") if ok else st.error(f"❌ {msg}")
            if ok: st.rerun()

    # ──────────────────────────────────────────────────────────
    # TAB 2 — Linha do Tempo
    # ──────────────────────────────────────────────────────────
    with tab2:
        st.markdown("**Marcos do projeto** — cada marco pode ter texto, fotos ou os dois")
        st.caption("Ponto verde = concluído · Ponto azul = planejado")

        mk = f"marcos_{proj['id']}"
        if mk not in st.session_state:
            st.session_state[mk] = [dict(m) for m in proj.get("marcos", [])]
        marcos = st.session_state[mk]

        for idx, marco in enumerate(marcos):
            icon = "✅" if marco.get("concluido") else "🔵"
            with st.expander(f"{icon} {marco.get('data','')}  —  {marco.get('titulo','(sem título)')}", expanded=False):
                r1, r2, r3 = st.columns([2, 3, 1])
                with r1:
                    marco["data"]      = st.text_input("Data", value=marco.get("data",""), key=f"d_{proj['id']}_{idx}", placeholder="Jun 2025")
                with r2:
                    marco["titulo"]    = st.text_input("Título", value=marco.get("titulo",""), key=f"t_{proj['id']}_{idx}")
                with r3:
                    marco["concluido"] = st.checkbox("Concluído ✅", value=marco.get("concluido",False), key=f"c_{proj['id']}_{idx}")

                marco["texto"] = st.text_area("Texto (opcional)", value=marco.get("texto",""),
                                              key=f"tx_{proj['id']}_{idx}", height=80)

                # Fotos do marco
                imagens = marco.get("imagens", [])
                if imagens:
                    st.markdown("**Fotos deste marco:**")
                    cols = st.columns(min(len(imagens), 3))
                    for iidx, img in enumerate(imagens):
                        with cols[iidx % 3]:
                            if Path(img["src"]).exists():
                                st.image(img["src"], use_container_width=True)
                            else:
                                st.caption(f"📁 `{img['src']}`")
                            img["legenda"] = st.text_input("Legenda", value=img.get("legenda",""),
                                                            key=f"il_{proj['id']}_{idx}_{iidx}", label_visibility="collapsed")
                            if st.button("🗑️", key=f"di_{proj['id']}_{idx}_{iidx}"):
                                imagens.pop(iidx)
                                st.rerun()
                marco["imagens"] = imagens

                img_up = st.file_uploader("➕ Adicionar foto ao marco", type=["jpg","jpeg","png","webp"],
                                          key=f"iup_{proj['id']}_{idx}")
                if img_up:
                    src = salvar_foto_arquivo(img_up, proj["id"], "marcos")
                    imagens.append({"src": src, "legenda": ""})
                    st.success(f"Foto salva em `{src}`")
                    st.rerun()

                if st.button("🗑️ Remover este marco", key=f"dm_{proj['id']}_{idx}"):
                    marcos.pop(idx)
                    st.rerun()

        # Novo marco
        st.divider()
        st.markdown("**➕ Adicionar novo marco**")
        n1, n2, n3 = st.columns([2, 3, 1])
        with n1:
            nd = st.text_input("Data", placeholder="Jan 2025", key=f"nd_{proj['id']}")
        with n2:
            nt = st.text_input("Título", placeholder="Ex: Medidas de campo", key=f"nt_{proj['id']}")
        with n3:
            nc = st.checkbox("Concluído", key=f"nc_{proj['id']}")
        ntx = st.text_area("Texto (opcional)", key=f"ntx_{proj['id']}", height=70)

        if st.button("➕ Adicionar marco"):
            if nt:
                marcos.append({"data": nd, "titulo": nt, "texto": ntx, "concluido": nc, "imagens": []})
                st.success(f"Marco '{nt}' adicionado! Clique em Salvar para confirmar.")
                st.rerun()
            else:
                st.warning("Digite pelo menos o título do marco.")

        st.divider()
        if st.button("💾 Salvar Linha do Tempo", type="primary"):
            ok, msg = salvar_campos(proj["id"], {"marcos": marcos})
            if ok:
                st.success("✅ Linha do tempo salva!")
                del st.session_state[mk]
                st.rerun()
            else:
                st.error(f"❌ {msg}")

    # ──────────────────────────────────────────────────────────
    # TAB 3 — Tags & Links
    # ──────────────────────────────────────────────────────────
    with tab3:
        col1, col2 = st.columns(2)

        with col1:
            st.markdown("**Tags** — uma por linha")
            tags_txt = st.text_area("Tags", value="\n".join(proj.get("tags", [])),
                                    height=180, label_visibility="collapsed",
                                    placeholder="FBG\nBOTDA\nSHM\nCNPq")

        with col2:
            st.markdown("**Links úteis**")
            lk = f"links_{proj['id']}"
            if lk not in st.session_state:
                st.session_state[lk] = [dict(l) for l in proj.get("links", [])]
            links = st.session_state[lk]

            for lidx, link in enumerate(links):
                la, lb, lc, ld = st.columns([1, 2, 4, 1])
                with la:
                    link["icone"] = st.text_input("", value=link.get("icone","🔗"), key=f"li_{proj['id']}_{lidx}", label_visibility="collapsed")
                with lb:
                    link["label"] = st.text_input("", value=link.get("label",""), key=f"ll_{proj['id']}_{lidx}", label_visibility="collapsed", placeholder="Rótulo")
                with lc:
                    link["url"]   = st.text_input("", value=link.get("url",""),   key=f"lu_{proj['id']}_{lidx}", label_visibility="collapsed", placeholder="https://...")
                with ld:
                    if st.button("🗑️", key=f"dl_{proj['id']}_{lidx}"):
                        links.pop(lidx); st.rerun()

            na, nb, nc2 = st.columns([1, 2, 4])
            with na: ni = st.text_input("", value="🔗", key=f"ni_{proj['id']}", label_visibility="collapsed")
            with nb: nl = st.text_input("", key=f"nl_{proj['id']}", label_visibility="collapsed", placeholder="Rótulo")
            with nc2: nu = st.text_input("", key=f"nu_{proj['id']}", label_visibility="collapsed", placeholder="https://...")
            if st.button("➕ Adicionar link"):
                if nl and nu:
                    links.append({"icone": ni, "label": nl, "url": nu})
                    st.rerun()
                else:
                    st.warning("Preencha rótulo e URL.")

        if st.button("💾 Salvar Tags & Links", type="primary"):
            tags = [t.strip() for t in tags_txt.splitlines() if t.strip()]
            ok, msg = salvar_campos(proj["id"], {"tags": tags, "links": links})
            if ok:
                st.success("✅ Salvo!")
                if lk in st.session_state: del st.session_state[lk]
                st.rerun()
            else:
                st.error(f"❌ {msg}")

    # ── Publicar no GitHub ────────────────────────────────────
    st.divider()
    with st.expander("🚀 Publicar no GitHub (opcional)"):
        st.caption("Faz commit e push para o repositório. O site atualiza em ~1 minuto.")
        git_msg = st.text_input("Mensagem", value=f"Atualização: {proj['titulo'][:50]}")
        if st.button("📤 Publicar agora", type="primary"):
            with st.spinner("Publicando..."):
                ok, err = git_commit_push(git_msg)
            st.success("✅ Publicado! Site atualiza em ~1 min.") if ok else st.warning(f"⚠️ {err}\n\nFaça o commit manualmente.")


if __name__ == "__main__":
    main()
