# Guia: Como publicar e atualizar o portfólio

## Estrutura dos arquivos

```
lab-site/
├── index.html   ← estrutura visual (não precisa editar)
└── data.js      ← TODO o conteúdo do site (edite aqui!)
```

---

## 1. Publicar no GitHub Pages (grátis)

### Passo 1 — Criar conta no GitHub
Acesse https://github.com e crie uma conta gratuita (se ainda não tiver).

### Passo 2 — Criar repositório
1. Clique em **New repository** (botão verde)
2. Nome do repositório: `portfolio-lab` (ou outro nome)
3. Deixe como **Public**
4. Clique em **Create repository**

### Passo 3 — Fazer upload dos arquivos
1. Na página do repositório, clique em **Add file → Upload files**
2. Arraste os dois arquivos: `index.html` e `data.js`
3. Clique em **Commit changes**

### Passo 4 — Ativar o GitHub Pages
1. Vá em **Settings** (engrenagem no topo)
2. No menu lateral, clique em **Pages**
3. Em "Branch", selecione **main** e clique em **Save**
4. Aguarde 1-2 minutos

✅ Seu site estará online em:
`https://SEU-USUARIO.github.io/portfolio-lab/`

---

## 2. Como adicionar um novo projeto

> Você só precisa editar o arquivo `data.js`.
> Nunca precisa tocar no `index.html`.

### No GitHub (sem instalar nada no computador)

1. Acesse seu repositório no GitHub
2. Clique no arquivo **`data.js`**
3. Clique no ícone de lápis ✏️ (canto superior direito)
4. Role até o final do array `PROJETOS`
5. Antes do `];`, copie e cole o bloco abaixo:

```javascript
{
  id:       "p7",              // número sequencial único
  titulo:   "Título do Projeto",
  status:   "ongoing",         // "ongoing" ou "completed"
  tipo:     "academic",        // "academic", "rd" ou "both"
  periodo:  "2025–atual",
  resumo:   "Resumo curto para o card (1-2 frases).",
  descricao:"Descrição longa para a página de detalhe.",
  pi:       "Nome do Pesquisador Responsável",
  fomento:  "Agência — Nome do Edital",
  progresso: 10,               // 0 a 100
  equipe:   [
    "Nome (Papel)",
    "Nome (Papel)",
  ],
  tags: ["Tag1", "Tag2", "Tag3"],
  objetivos: [
    "Objetivo 1.",
    "Objetivo 2.",
  ],
  metodologia: "Descrição da metodologia.",
  resultados: [
    "Resultado 1.",
  ],
  publicacoes: [],
},
```

6. Preencha os campos
7. Clique em **Commit changes** (botão verde)
8. O site atualiza em segundos ✅

---

## 3. Outras atualizações comuns

### Adicionar membro da equipe
No `data.js`, localize o array `EQUIPE` e adicione:
```javascript
{
  iniciais: "XX",
  nome:  "Nome Completo",
  cargo: "Cargo",
  area:  "Área de pesquisa.",
},
```

### Adicionar publicação
No array `PUBLICACOES`, adicione no início (para aparecer primeiro):
```javascript
{
  titulo:  "Título completo do artigo",
  autores: "Sobrenome, I.; Sobrenome, I.",
  veiculo: "Nome do Periódico · DOI: 10.xxxx/xxxx",
  ano:     2025,
},
```

### Adicionar patente
No array `PATENTES`:
```javascript
{
  emoji:  "🔬",
  titulo: "Nome da invenção",
  numero: "INPI BR 10 20XX XXXXXX-X · 2025",
  status: "pending",  // "pending" ou "granted"
},
```

### Atualizar métricas do hero
No objeto `LAB`, atualize os números:
```javascript
stats: {
  projetos:      15,
  pesquisadores: 11,
  publicacoes:   50,
  patentes:       7,
  parceiros:      9,
},
```

### Marcar projeto como concluído
Localize o projeto pelo `id` e altere:
```javascript
status:    "completed",
progresso: 100,
```

---

## 4. Domínio personalizado (opcional)

Se quiser usar um endereço como `lab.universidade.br`:

1. No GitHub → Settings → Pages → **Custom domain**
2. Digite o domínio desejado e salve
3. Configure o DNS com o setor de TI da universidade
   (apontar para `SEU-USUARIO.github.io`)

---

## 5. Dicas rápidas

| O que fazer | Arquivo | Seção |
|---|---|---|
| Novo projeto | `data.js` | array `PROJETOS` |
| Nova publicação | `data.js` | array `PUBLICACOES` |
| Novo membro | `data.js` | array `EQUIPE` |
| Nova patente | `data.js` | array `PATENTES` |
| Novo parceiro | `data.js` | objeto `PARCEIROS` |
| Atualizar contato | `data.js` | objeto `LAB` |
| Atualizar métricas | `data.js` | `LAB.stats` |

---

*Dúvidas? Qualquer pessoa familiar com GitHub consegue ajudar — ou entre em contato com o suporte de TI da universidade.*
