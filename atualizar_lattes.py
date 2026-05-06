name: Atualizar dados do Lattes

on:
  push:
    paths:
      - 'lattes/**.xml'
      - 'lattes/**.zip'
  workflow_dispatch:
  schedule:
    - cron: '0 11 * * 1'

env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true

jobs:
  atualizar:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Baixar repositório
        uses: actions/checkout@v4

      - name: Configurar Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Listar XMLs encontrados
        run: |
          echo "=== Conteúdo da pasta lattes/ ==="
          ls -la lattes/ || echo "Pasta lattes/ não encontrada"
          echo "=== XMLs encontrados ==="
          find lattes/ -name "*.xml" -o -name "*.zip" 2>/dev/null || echo "Nenhum XML/ZIP"

      - name: Executar atualizador
        run: python atualizar_lattes.py

      - name: Verificar se houve mudanças
        id: changes
        run: |
          git diff --quiet data.js && echo "changed=false" >> $GITHUB_OUTPUT || echo "changed=true" >> $GITHUB_OUTPUT

      - name: Fazer commit das atualizações
        if: steps.changes.outputs.changed == 'true'
        run: |
          git config user.name  "Lattes Bot"
          git config user.email "bot@laboratorio"
          git add data.js
          git commit -m "Atualizacao automatica via Lattes [$(date '+%d/%m/%Y')]"
          git push

      - name: Sem mudanças
        if: steps.changes.outputs.changed == 'false'
        run: echo "Nenhuma mudança detectada — commit não necessário."
