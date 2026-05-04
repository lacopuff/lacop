/**
 * ============================================================
 *  DATA.JS — Conteúdo do Portfólio do Laboratório
 * ============================================================
 *
 *  ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR.
 *
 *  Para adicionar um novo projeto:
 *    1. Copie um dos blocos abaixo (entre { ... })
 *    2. Cole ao final da lista (antes do ];)
 *    3. Preencha os campos
 *    4. Salve — o site atualiza automaticamente.
 *
 * ============================================================
 */

// ── INFORMAÇÕES GERAIS DO LABORATÓRIO ─────────────────────
const LAB = {
  sigla:         "LACOP",
  nomeCompleto:  "Laboratório de Comunicações Ópticas, Instrumentação e Sensores",
  universidade:  "Universidade Federal Fluminense — Departamento de Engenharia de Telecomunicações",
  descricao:     "Laboratório de pesquisa e desenvolvimento em comunicações ópticas, instrumentação e sensores",
  email:         "viniciusnhs@id.uff.br",
  endereco:      "Rua Passo da Pátria, 156, Bloco E, Sala 413/307, São Domingos, Niterói – Rio de Janeiro",
  lattes:        "Link para perfis institucionais dos pesquisadores",
  // Métricas do hero (atualize manualmente)
  stats: {
    projetos:      14,
    pesquisadores: 10,
    publicacoes:   47,
    patentes:       6,
    parceiros:      8,
  },
};

// ── EQUIPE ─────────────────────────────────────────────────
//
//  Campos:
//    iniciais   — 2 letras para o avatar (ex: "AS")
//    nome       — nome completo com título
//    cargo      — ex: "Coordenadora", "Doutorando", "Bolsista IC"
//    area       — frase curta descrevendo a linha de pesquisa
//
const EQUIPE = [
  {
    iniciais: "VNHS",
    nome:  "Prof. DSc. Vinicius N. Henrique Silva",
    cargo: "Pesquisador, Associado",
    area:  "Comunicações ópticas sem fio, instrumentação e sensores",
  },
  {
    iniciais: "APLB",
    nome:  "Prof. DSc. Andrés Pablo Lopez Barbero",
    cargo: "Pesquisador Sênior, full professor",
    area:  "Instrumentação fotônica e interrogação de sensores FBG.",
  },
  {
    iniciais: "LF",
    nome:  "Dra. Lúcia Ferreira",
    cargo: "Pesquisadora",
    area:  "Sensoriamento distribuído DTS/DAS e aplicações industriais.",
  },
  {
    iniciais: "RS",
    nome:  "Rafael Santos",
    cargo: "Doutorando",
    area:  "BOTDA de alta resolução para aplicações de SHM.",
  },
  {
    iniciais: "MC",
    nome:  "Marina Costa",
    cargo: "Mestranda",
    area:  "Redes FBG multiplexadas para monitoramento estrutural.",
  },
  {
    iniciais: "JP",
    nome:  "João Pedro Lima",
    cargo: "Bolsista IC",
    area:  "Caracterização de componentes ópticos passivos.",
  },
  {
    iniciais: "BT",
    nome:  "Beatriz Torres",
    cargo: "Doutoranda",
    area:  "Não-linearidades em sistemas WDM e compensação digital.",
  },
  {
    iniciais: "FO",
    nome:  "Felipe Oliveira",
    cargo: "Mestrando",
    area:  "Sensores de corrente baseados em efeito Faraday.",
  },
];

// ── PUBLICAÇÕES ────────────────────────────────────────────
//
//  Campos:
//    titulo   — título completo do artigo
//    autores  — autores no formato "Sobrenome, I.; ..."
//    veiculo  — nome do periódico/conferência + DOI
//    ano      — ano de publicação (número)
//
const PUBLICACOES = [
  {
    titulo:  "High-Resolution BOTDA Sensing Using Differential Pulse-Width Pair Technique in Single-Mode Fibers",
    autores: "Santos, R.; Silva, A.; Mendes, C.; Ferreira, L.",
    veiculo: "Journal of Lightwave Technology · DOI: 10.1109/JLT.2024.xxxxxxx",
    ano:     2024,
  },
  {
    titulo:  "Multiplexed FBG Sensor Network for Structural Health Monitoring of Reinforced Concrete Bridges",
    autores: "Ferreira, L.; Costa, M.; Silva, A.",
    veiculo: "Optics & Laser Technology · DOI: 10.1016/j.optlastec.2024.xxxxx",
    ano:     2024,
  },
  {
    titulo:  "Nonlinear Impairment Mitigation in Long-Haul WDM Systems via Digital Pre-Compensation",
    autores: "Torres, B.; Silva, A.; Lima, J. P.",
    veiculo: "Optics Express · DOI: 10.1364/OE.2023.xxxxxx",
    ano:     2023,
  },
  {
    titulo:  "Compact FBG Interrogator Based on Tunable Laser for Field Deployment",
    autores: "Mendes, C.; Santos, R.; Silva, A.",
    veiculo: "IEEE Photonics Technology Letters · DOI: 10.1109/LPT.2023.xxxxxxx",
    ano:     2023,
  },
  {
    titulo:  "Faraday-Effect Optical Current Sensor for Power Grid Monitoring",
    autores: "Oliveira, F.; Ferreira, L.; Mendes, C.",
    veiculo: "Sensors and Actuators A: Physical · DOI: 10.1016/j.sna.2022.xxxxx",
    ano:     2022,
  },
];

// ── PATENTES ───────────────────────────────────────────────
//
//  status: "granted" (concedida) | "pending" (em análise)
//
const PATENTES = [
  {
    emoji:  "🔬",
    titulo: "Interrogador Óptico Compacto para Redes de FBG",
    numero: "INPI BR 10 2022 012345-6 · 2022",
    status: "granted",
  },
  {
    emoji:  "📡",
    titulo: "Sistema de Detecção de Vazamentos em Dutos por DAS",
    numero: "INPI BR 10 2023 018762-1 · 2023",
    status: "pending",
  },
  {
    emoji:  "⚡",
    titulo: "Sensor de Corrente por Efeito Faraday em Fibra Óptica",
    numero: "INPI BR 10 2021 009834-2 · 2021",
    status: "granted",
  },
  {
    emoji:  "🌡️",
    titulo: "Plataforma DTS para Monitoramento de Cabos de Alta Tensão",
    numero: "INPI BR 10 2024 004210-9 · 2024",
    status: "pending",
  },
];

// ── PARCEIROS ──────────────────────────────────────────────
const PARCEIROS = {
  fomento:    ["CNPq", "FAPERJ", "FINEP", "ANEEL P&D", "CAPES"],
  industrial: ["Operadora de Telecomunicações", "Empresa de Óleo & Gás", "Concessionária de Energia", "Fabricante de Instrumentos"],
  academico:  ["Universidade Parceira A", "Universidade Parceira B", "Instituto Internacional de Fotônica"],
};

// ══════════════════════════════════════════════════════════
//  PROJETOS
//  ────────────────────────────────────────────────────────
//
//  CAMPOS OBRIGATÓRIOS:
//    id        — identificador único, sem espaços (ex: "p7")
//    titulo    — título do projeto
//    status    — "ongoing" (em andamento) | "completed" (concluído)
//    tipo      — "academic" | "rd" (P&D) | "both"
//    periodo   — ex: "2024–atual" ou "2022–2024"
//    resumo    — parágrafo curto para o card na lista
//    descricao — parágrafo longo para a página de detalhe
//    pi        — nome do pesquisador responsável
//    fomento   — ex: "CNPq — Chamada Universal 2024"
//    progresso — 0 a 100 (porcentagem de conclusão)
//    equipe    — lista de nomes com papel
//    tags      — palavras-chave (lista de strings)
//
//  CAMPOS OPCIONAIS:
//    objetivos    — lista de strings (bullets)
//    metodologia  — texto descritivo
//    resultados   — lista de strings (bullets)
//    publicacoes  — lista de { titulo, veiculo }
//
// ══════════════════════════════════════════════════════════

const PROJETOS = [

  // ── PROJETO 1 ──────────────────────────────────────────
  {
    id:       "p1",
    titulo:   "Sensoriamento Distribuído por Espalhamento Brillouin em Fibras Monomodo",
    status:   "ongoing",
    tipo:     "academic",
    periodo:  "2023–atual",
    resumo:   "Investigação de técnicas BOTDA para medição de temperatura e deformação com alta resolução espacial em fibras de longa extensão.",
    descricao:"Investigação de técnicas BOTDA (Brillouin Optical Time Domain Analysis) para medição simultânea de temperatura e deformação com alta resolução espacial em fibras de longa extensão, com aplicação em monitoramento de infraestrutura crítica.",
    pi:       "Prof. Ana Silva",
    fomento:  "CNPq — Chamada Universal 2023",
    progresso: 45,
    equipe:   ["Rafael Santos (Doutorando)", "João Pedro Lima (IC)", "Prof. Ana Silva (PI)"],
    tags:     ["BOTDA", "Brillouin", "Fibra monomodo", "Sensoriamento distribuído", "SHM", "CNPq"],
    objetivos: [
      "Desenvolver técnica BOTDA com resolução espacial < 10 cm em fibras de até 50 km.",
      "Implementar algoritmo de processamento de sinal para extração simultânea de temperatura e deformação.",
      "Validar o sistema em bancada e em protótipo de estrutura de concreto armado.",
      "Publicar resultados em periódicos Qualis A1 da área de fotônica.",
    ],
    metodologia: "A metodologia combina geração de pulsos de bombeio de largura variável (técnica DPP-BOTDA) com aquisição de sinal por osciloscópio de alta velocidade. O processamento de sinal é realizado em Python com algoritmos de ajuste de curva Lorentziana. A validação experimental é feita em bancada com fibra SMF-28 e em lajes de concreto instrumentadas no laboratório.",
    resultados: [
      "Resolução espacial de 20 cm demonstrada em fibra de 10 km.",
      "Sensibilidade de temperatura: 1 MHz/°C; deformação: 0,05 MHz/με.",
      "2 artigos publicados em conferências internacionais (OFC 2023, ECOC 2024).",
      "Sistema de aquisição em hardware implementado e testado.",
    ],
    publicacoes: [
      { titulo: "High-Resolution BOTDA Sensing Using Differential Pulse-Width Pair Technique", veiculo: "Journal of Lightwave Technology · 2024" },
    ],
  },

  // ── PROJETO 2 ──────────────────────────────────────────
  {
    id:       "p2",
    titulo:   "Monitoramento de Dutos por Fibra Óptica para a Indústria de Óleo & Gás",
    status:   "ongoing",
    tipo:     "rd",
    periodo:  "2024–atual",
    resumo:   "Desenvolvimento de plataforma embarcada de sensoriamento acústico distribuído (DAS) para detecção de vazamentos e deformações em dutos offshore.",
    descricao:"Desenvolvimento de plataforma embarcada de sensoriamento acústico distribuído (DAS) para detecção em tempo real de vazamentos, impactos mecânicos e deformações em dutos offshore, em parceria com empresa do setor energético.",
    pi:       "Dr. Carlos Mendes",
    fomento:  "FINEP — Programa Inova Energia",
    progresso: 30,
    equipe:   ["Dr. Carlos Mendes (PI)", "Rafael Santos (Doutorando)", "Beatriz Torres (Doutoranda)", "Engenheiro Parceiro Industrial"],
    tags:     ["DAS", "Óleo & Gás", "Subsea", "Detecção de vazamentos", "FINEP", "P&D"],
    objetivos: [
      "Desenvolver unidade DAS embarcada operável em ambiente offshore (IP67, −20°C a +60°C).",
      "Criar algoritmos de classificação de eventos acústicos com acurácia > 95%.",
      "Integrar o sistema com plataforma SCADA do parceiro industrial.",
      "Realizar testes de campo em duto de 20 km com resultados validados.",
    ],
    metodologia: "O sistema DAS utiliza laser de coerência estreita (largura de linha < 1 kHz) com modulação de pulsos via AOM. O processamento de fase é realizado em FPGA embarcado (Xilinx Zynq). O reconhecimento de eventos é feito por rede neural convolucional treinada com biblioteca proprietária de assinaturas acústicas.",
    resultados: [
      "Protótipo de bancada do interrogador DAS concluído e validado.",
      "Dataset de treinamento com 15 classes de eventos acústicos coletado.",
      "Algoritmo de classificação com 91% de acurácia em testes laboratoriais.",
      "Parceria formalizada com empresa do setor; contrato de P&D assinado.",
    ],
    publicacoes: [],
  },

  // ── PROJETO 3 ──────────────────────────────────────────
  {
    id:       "p3",
    titulo:   "Redes FBG para Monitoramento Estrutural de Pontes e Viadutos",
    status:   "ongoing",
    tipo:     "academic",
    periodo:  "2024–atual",
    resumo:   "Projeto e implantação de redes de sensores FBG multiplexados em estruturas de concreto armado com aquisição em tempo real.",
    descricao:"Projeto e implantação de redes de sensores de rede de Bragg em fibra (FBG) multiplexados em estruturas de concreto armado, com sistema de aquisição em tempo real e análise automatizada de integridade estrutural (SHM).",
    pi:       "Dra. Lúcia Ferreira",
    fomento:  "FAPERJ — APQ1 2024",
    progresso: 20,
    equipe:   ["Dra. Lúcia Ferreira (PI)", "Marina Costa (Mestranda)", "João Pedro Lima (IC)", "Colaboradores do Depto. de Engenharia Civil"],
    tags:     ["FBG", "SHM", "WDM passivo", "Pontes", "FAPERJ", "Concreto armado"],
    objetivos: [
      "Projetar rede com 32 sensores FBG multiplexados em 4 canais WDM de 8 sensores cada.",
      "Instalar o sistema em viaduto real em parceria com concessionária de rodovias.",
      "Desenvolver dashboard web para visualização em tempo real dos dados.",
      "Correlacionar dados de SHM com modelos de elementos finitos da estrutura.",
    ],
    metodologia: "Os sensores FBG são gravados no laboratório por técnica de máscara de fase com laser UV. A multiplexação usa AWGM passivo de 8 canais. O interrogador é baseado em laser sintonizável com varredura de 1520–1570 nm. Os dados são adquiridos a 1 kHz com alertas automáticos por e-mail e SMS.",
    resultados: [
      "Rede de 16 FBGs gravados e caracterizados em laboratório.",
      "Interrogador óptico configurado e calibrado.",
      "Protocolo de instalação em concreto definido com parceiros.",
      "Previsão de instalação em campo: julho de 2025.",
    ],
    publicacoes: [
      { titulo: "Multiplexed FBG Sensor Network for Structural Health Monitoring of Reinforced Concrete Bridges", veiculo: "Optics & Laser Technology · 2024" },
    ],
  },

  // ── PROJETO 4 ──────────────────────────────────────────
  {
    id:       "p4",
    titulo:   "Interrogador Óptico Compacto para Redes FBG em Campo",
    status:   "completed",
    tipo:     "rd",
    periodo:  "2021–2023",
    resumo:   "Desenvolvimento de protótipo de interrogador portátil de baixo custo para leitura de redes FBG em campo, validado e transferido para fabricante nacional.",
    descricao:"Desenvolvimento de protótipo de interrogador portátil e de baixo custo para leitura de redes FBG em aplicações de campo, com foco em robustez, simplicidade de operação e custo reduzido frente às soluções comerciais existentes.",
    pi:       "Dr. Carlos Mendes",
    fomento:  "FINEP — Subvenção Econômica PME",
    progresso: 100,
    equipe:   ["Dr. Carlos Mendes (PI)", "Rafael Santos (Mestrando)", "Engenheiro do Parceiro Industrial"],
    tags:     ["FBG interrogator", "Laser sintonizável", "Prototipagem", "Transferência tecnológica", "FINEP"],
    objetivos: [
      "Projetar interrogador com custo de BOM < R$ 8.000.",
      "Atingir resolução de comprimento de onda de 1 pm e taxa de aquisição de 100 Hz.",
      "Validar o protótipo em campo em parceria com empresa de instrumentação.",
      "Transferir a tecnologia para fabricação em série pelo parceiro industrial.",
    ],
    metodologia: "O interrogador utiliza laser DFB de 1550 nm com sintonização por corrente (±2 nm). A detecção é feita por fotodiodo InGaAs com TIA de baixo ruído. O processamento é embarcado em Raspberry Pi 4. O encapsulamento é em caixa de alumínio usinada com grau de proteção IP54.",
    resultados: [
      "Protótipo final construído; resolução de 0,8 pm atingida.",
      "Taxa de aquisição de 200 Hz obtida (superior à meta).",
      "Validação em campo realizada em 3 sites com redes FBG de até 8 sensores.",
      "Tecnologia licenciada; 12 unidades comercializadas até dez/2024.",
      "Patente INPI BR 10 2022 012345-6 concedida em 2024.",
    ],
    publicacoes: [
      { titulo: "Compact FBG Interrogator Based on Tunable Laser for Field Deployment", veiculo: "IEEE Photonics Technology Letters · 2023" },
    ],
  },

  // ── PROJETO 5 ──────────────────────────────────────────
  {
    id:       "p5",
    titulo:   "Análise de Não-Linearidades em Sistemas WDM de Longa Distância",
    status:   "completed",
    tipo:     "academic",
    periodo:  "2020–2022",
    resumo:   "Estudo teórico-experimental dos efeitos de SPM, XPM e FWM em enlaces de 1000+ km com técnicas de mitigação baseadas em pré-compensação digital.",
    descricao:"Estudo teórico-experimental dos principais efeitos não-lineares (SPM, XPM e FWM) em sistemas WDM de longa distância (>1000 km), com proposta e validação de técnicas de mitigação baseadas em pré-distorção digital de sinal.",
    pi:       "Prof. Ana Silva",
    fomento:  "CNPq — Bolsa de Produtividade PQ2",
    progresso: 100,
    equipe:   ["Prof. Ana Silva (PI)", "Beatriz Torres (Mestranda)", "João Pedro Lima (IC)"],
    tags:     ["WDM", "SPM", "XPM", "FWM", "DSP óptico", "Pré-compensação", "EDFA"],
    objetivos: [
      "Caracterizar experimentalmente SPM, XPM e FWM em enlace recirculating loop de 1200 km.",
      "Desenvolver modelo analítico de penalidade de OSNR induzida por não-linearidades.",
      "Propor e validar algoritmo de pré-distorção digital para mitigação de XPM.",
      "Publicar resultados em periódicos de alto impacto.",
    ],
    metodologia: "A bancada experimental consiste em recirculating loop de 80 km com amplificação EDFA, analisador de espectro óptico (OSA) e receptor coerente DP-QPSK. O modelo analítico usa o formalismo de perturbação de primeira ordem (GN model). O algoritmo de mitigação foi implementado em MATLAB.",
    resultados: [
      "Caracterização completa de SPM/XPM/FWM em 9 configurações de potência.",
      "Modelo analítico com erro < 0,3 dB frente a medições experimentais.",
      "Algoritmo de pré-distorção com ganho de 1,8 dB de OSNR em 1200 km.",
      "3 artigos publicados em periódicos A1; 1 capítulo de livro.",
    ],
    publicacoes: [
      { titulo: "Nonlinear Impairment Mitigation in Long-Haul WDM Systems via Digital Pre-Compensation", veiculo: "Optics Express · 2023" },
    ],
  },

  // ── PROJETO 6 ──────────────────────────────────────────
  {
    id:       "p6",
    titulo:   "Plataforma IoT com Sensores Ópticos para Redes de Distribuição Elétrica",
    status:   "ongoing",
    tipo:     "rd",
    periodo:  "2023–atual",
    resumo:   "Integração de sensores DTS a fibra óptica com IoT para monitoramento térmico de subestações e cabos subterrâneos de alta tensão.",
    descricao:"Desenvolvimento e implantação de sistema integrado de sensoriamento térmico distribuído (DTS) com conectividade IoT para monitoramento de cabos subterrâneos de alta tensão e transformadores em subestações.",
    pi:       "Dra. Lúcia Ferreira",
    fomento:  "ANEEL P&D — Ciclo 2023/2024",
    progresso: 55,
    equipe:   ["Dra. Lúcia Ferreira (PI)", "Felipe Oliveira (Mestrando)", "Marina Costa (Mestranda)", "Engenheiros da Concessionária"],
    tags:     ["DTS", "IoT", "MQTT", "Setor elétrico", "ANEEL P&D", "Alta tensão"],
    objetivos: [
      "Desenvolver unidade DTS com resolução de 1 m e acurácia de ±0,5°C.",
      "Criar plataforma IoT com protocolo MQTT integrada ao SCADA da concessionária.",
      "Implementar alertas preditivos de sobrecarga térmica.",
      "Instalar e validar em 5 km de cabos subterrâneos em operação comercial.",
    ],
    metodologia: "O sistema DTS é baseado em espalhamento Raman espontâneo com laser pulsado de fibra (1064 nm). A unidade IoT usa ESP32 com Wi-Fi/4G e protocolo MQTT para broker cloud (AWS IoT). Os alertas usam threshold adaptativo com janela deslizante de 24 horas.",
    resultados: [
      "Unidade DTS de laboratório: resolução de 0,8 m e ±0,3°C.",
      "Plataforma IoT com dashboard em Grafana funcionando em ambiente de teste.",
      "Protocolo de comunicação com SCADA validado.",
      "Instalação piloto em 2 km de cabo prevista para março de 2025.",
    ],
    publicacoes: [],
  },

  // ── MODELO PARA NOVO PROJETO ────────────────────────────
  // Copie este bloco, remova os // do início de cada linha
  // e preencha com os dados do novo projeto:
  //
  // {
  //   id:       "p7",                        // número sequencial
  //   titulo:   "Título do Novo Projeto",
  //   status:   "ongoing",                   // "ongoing" ou "completed"
  //   tipo:     "academic",                  // "academic", "rd" ou "both"
  //   periodo:  "2025–atual",
  //   resumo:   "Resumo curto para o card (1-2 frases).",
  //   descricao:"Descrição longa para a página de detalhe.",
  //   pi:       "Nome do Pesquisador Responsável",
  //   fomento:  "Agência — Nome do Edital",
  //   progresso: 10,                         // 0 a 100
  //   equipe:   ["Nome (Papel)", "Nome (Papel)"],
  //   tags:     ["Tag1", "Tag2", "Tag3"],
  //   objetivos: [
  //     "Objetivo 1.",
  //     "Objetivo 2.",
  //   ],
  //   metodologia: "Descrição da metodologia.",
  //   resultados: [
  //     "Resultado 1.",
  //   ],
  //   publicacoes: [],
  // },

];
