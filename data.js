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
  sigla:         "LabÓptica",
  nomeCompleto:  "Laboratório de Fotônica e Sistemas Ópticos",
  universidade:  "Universidade — Departamento de Engenharia",
  descricao:     "Pesquisa fundamental e desenvolvimento aplicado em comunicações por fibra óptica, instrumentação fotônica e sistemas de sensoriamento distribuído — da bancada ao campo.",
  email:         "laboratorio@universidade.br",
  endereco:      "Prédio de Engenharia, Sala 00 — Campus Central, Cidade – Estado",
  telefone:      "(xx) xxxx-xxxx",
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
//    iniciais   — 2 letras usadas como fallback se não tiver foto (ex: "AS")
//    nome       — nome completo com título
//    cargo      — ex: "Coordenadora", "Doutorando", "Bolsista IC"
//    area       — frase curta descrevendo a linha de pesquisa
//    foto       — (OPCIONAL) caminho da foto. Duas opções:
//
//                 Opção A — foto no próprio repositório:
//                   1. No GitHub, crie uma pasta chamada "fotos"
//                   2. Faça upload da foto lá (ex: ana-silva.jpg)
//                   3. Use o caminho: foto: "fotos/ana-silva.jpg"
//
//                 Opção B — URL externa (ex: foto do site da universidade):
//                   foto: "https://universidade.br/foto-ana.jpg"
//
//                 Se o campo "foto" for omitido ou a imagem não carregar,
//                 as iniciais aparecem automaticamente como fallback.
//
const EQUIPE = [
  {
    iniciais: "AS",
    foto:  "fotos/ana-silva.jpg",
    nome:  "Prof. Ana Silva",
    cargo: "Coordenadora",
    area:  "Comunicações ópticas coerentes e processamento de sinais.",
  },
  {
    iniciais: "CM",
    foto:  "fotos/carlos-mendes.jpg",
    nome:  "Dr. Carlos Mendes",
    cargo: "Pesquisador Sênior",
    area:  "Instrumentação fotônica e interrogação de sensores FBG.",
  },
  {
    iniciais: "LF",
    foto:  "fotos/lucia-ferreira.jpg",
    nome:  "Dra. Lúcia Ferreira",
    cargo: "Pesquisadora",
    area:  "Sensoriamento distribuído DTS/DAS e aplicações industriais.",
  },
  {
    iniciais: "RS",
    foto:  "fotos/rafael-santos.jpg",
    nome:  "Rafael Santos",
    cargo: "Doutorando",
    area:  "BOTDA de alta resolução para aplicações de SHM.",
  },
  {
    iniciais: "MC",
    foto:  "fotos/marina-costa.jpg",
    nome:  "Marina Costa",
    cargo: "Mestranda",
    area:  "Redes FBG multiplexadas para monitoramento estrutural.",
  },
  {
    iniciais: "JP",
    foto:  "fotos/joao-pedro.jpg",
    nome:  "João Pedro Lima",
    cargo: "Bolsista IC",
    area:  "Caracterização de componentes ópticos passivos.",
  },
  {
    iniciais: "BT",
    foto:  "fotos/beatriz-torres.jpg",
    nome:  "Beatriz Torres",
    cargo: "Doutoranda",
    area:  "Não-linearidades em sistemas WDM e compensação digital.",
  },
  {
    iniciais: "FO",
    foto:  "fotos/felipe-oliveira.jpg",
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
    titulo:  "Machine learning algorithms for triangulation-based optical beam tracking in FSO systems",
    autores: "H.B., B. F.; A., G. M.; P.L., B. A.; N., F. T.; Silva, V. N. H.",
    veiculo: " · DOI: 10.1016/j.optlaseng.2025.109397",
    ano:     2026,
  },
  {
    titulo:  "Assessing functional diversity and composition using multispectral images in Atlantic Forest restoration sites",
    autores: "AYRES, D. O. J.; AMORIM, D. F. O. Â. M.; QUINTÃO, D. A. A.; TORRES, D. A. C.; BASTOS, G. E.; Silva, V. N. H.; DUARTE, D. M. L. F.; BASTOS, L. G.; BARRETO, S. J. B.",
    veiculo: " · DOI: 10.1111/rec.70310",
    ano:     2026,
  },
  {
    titulo:  "Hop Essential Oils: Multivariate Hydrodistillation Optimization and GC-MS Characterization",
    autores: "SILVA, A. R.; FERRARI, Q. B. C.; CUNHA, P. F.; ALCOFORADO, S. L.; Silva, V. N. H.; MATTOS, D. L.; CARVALHO, M. F. F. D.",
    veiculo: " · DOI: 10.1021/acsfoodscitech.5c01075",
    ano:     2026,
  },
  {
    titulo:  "Sum-Rate Maximization in Massive MIMO with Joint Antenna Selection and Power Allocation",
    autores: "Gois, J. N.; Silva, M. d. S. P.; Silva, V. N. H.; Ferreira, T. N.",
    veiculo: " · DOI: 10.21528/lnlm-vol23-no1-art1",
    ano:     2025,
  },
  {
    titulo:  "New approach to estimate sensible heat flux through optical triangulation",
    autores: "Garrido, M. A. D.; Lyra, G. B.; Zeri, M.; HAJJAR, H. A.; Barbero, A. P. L.; Silva, V. N. H.",
    veiculo: " · DOI: 10.1016/j.measurement.2025.116655",
    ano:     2025,
  },
  {
    titulo:  "Modeling of Data Transmission in Polymer Optical Fibers Using DMT and Machine Learning Techniques",
    autores: "Gois, J. N.; Sampaio, F. A. N.; Haddad, D. B.; Neto, L. A.; Silva, V. N. H.; Ferreira, T. N.",
    veiculo: " · DOI: 10.1002/mop.70109",
    ano:     2025,
  },
  {
    titulo:  "Analysis of sugar distributions in barley wort saccharification via Capillary Electrophoresis",
    autores: "Aredes, R.; Peixoto, F. C.; Sphaier, L. A.; Silva, V. N. H.; Duarte, L. M.; Marques, F. F. d. C.",
    veiculo: " · DOI: 10.1021/acsfoodscitech.4c00696",
    ano:     2025,
  },
  {
    titulo:  "Mitigation of Pointing Errors in FSO Systems Through AI-Driven Spatial Light Modulation",
    autores: "B., B. F.; F., C. V.; M., F. G.; L., B. A.; P., M. P.; P., G. F.; Silva, V. N. H.",
    veiculo: " · DOI: 10.1109/lpt.2025.3575366",
    ano:     2025,
  },
  {
    titulo:  "Enhancing Noise Resilience of CE-OFDM in Visible Light Communication Systems",
    autores: "R., R. B. M. S.; Silva, V. N. H.; P., M. P.; R., M. M. C.",
    veiculo: " · DOI: 10.1109/LPT.2025.3577779",
    ano:     2025,
  },
  {
    titulo:  "Enhanced Photodetector Field of View for IoT-Driven VLC Systems Using Fluorescent Optical Antennas",
    autores: "C., B. A. A.; D., A. T.; M., R. R.; L., B. A. P.; B., D. R. R.; C., P. F.; Silva, V. N. H.",
    veiculo: " · DOI: 10.1109/ACCESS.2025.3593261",
    ano:     2025,
  },
  {
    titulo:  "Material Classification Using Optical Wireless Communications Data and Machine Learning",
    autores: "ADRIANE, D.; AMARO, L.; MICHEL, T.; MARIA, M.; Silva, V. N. H.; FELIPE, H.",
    veiculo: "2025 IEEE 16th Latin America Symposium on Circuits and Systems (LASCAS)",
    ano:     2025,
  },
  {
    titulo:  "Coating of microfibrillated cellulose on plastic optical fiber",
    autores: "GUILHERME, D. É.; LAVINNE, F. D. Q. I.; ISABELA, R. M.; PABLO, L. B. A.; ISABEL, B. R. N.; Silva, V. N. H.",
    veiculo: "29th International Conference on Optical Fiber Sensors",
    ano:     2025,
  },
  {
    titulo:  "Experimental Evaluation of FSO Link: Impact of Pointing Error on OFDM System Performance",
    autores: "D., E. G.; D., G. M. A.; L., B. A. P.; GUSTAVO, B. L.; V., C. T.; Silva, V. N. H.",
    veiculo: "2025 IEEE International Instrumentation and Measurement Technology Conference (I2MTC)",
    ano:     2025,
  },
  {
    titulo:  "Influence of LOS and NLOS Components in an Indoor VLC-RSMA System",
    autores: "D., A. T.; Silva, V. N. H.; Renna, R. B. D.",
    veiculo: "2025 International Conference on Optical Network Design and Modeling (ONDM)",
    ano:     2025,
  },
  {
    titulo:  "Modulation Strategies for Robust Optical Wireless Communications and Sensing in 6G",
    autores: "M.S.R., R. B.; Silva, V. N. H.; P., M. P.; R., M. M. C.",
    veiculo: "2025 25th Anniversary International Conference on Transparent Optical Networks (ICTON)",
    ano:     2025,
  },
  {
    titulo:  "Inter-symbol and Multi-user Interference Cancellation for LEO Satellite Systems",
    autores: "F, S. F.; VICTOR, F.; G., G. A.; Silva, V. N. H.; DI, R. R. B.",
    veiculo: "XLIII Simpósio Brasileiro de Telecomunicações e Processamento de Sinais",
    ano:     2025,
  },
  {
    titulo:  "Temporal Analysis of Commercially Available Fluorescent Plastic Optical Fibers Intended for VLC Applications",
    autores: "Maia, B. F. C. B.; Pinheiro, I. L. d. C.; Ferreira, V. T.; Silva, V. N. H.; Vieira, P.; Andrade, J. R. M. d.; Ribeiro, R. M.",
    veiculo: "The 33rd International Conference on Plastic Optical Fibers",
    ano:     2025,
  },
  {
    titulo:  "Preliminary Construction of Microfibrillated Cellulose-Based Biofilms Functionalized with Colorimetric Indicators for Fiber-Optic Calcium Sensing",
    autores: "Ramírez, N. I. B.; Silva, M. C. d.; Ribeiro, R. S. d. A.; Jupy, A. B.; Silva, V. N. H.",
    veiculo: "Congresso Brasileiro de Engenharia Química e Encontro Brasiliero sobre o Ensino de Engenharia Química",
    ano:     2025,
  },
  {
    titulo:  "AI-Driven Atmospheric Turbulence Compensation and Channel Modeling in FSO Systems",
    autores: "B., B. F.; M., F. G.; L., B. A.; P., M. P.; P., G. F.; Silva, V. N. H.",
    veiculo: "2025 SBFoton International Optics and Photonics Conference (SBFoton IOPC)",
    ano:     2025,
  },
  {
    titulo:  "Adaptive Inter-Symbol and Multi-User Interference Cancellation for OTFS in LEO SATCOM",
    autores: "F., S. F.; VICTOR, F.; Silva, V. N. H.; B., D. R. R.",
    veiculo: "2025 SBMO/IEEE MTTS International Microwave and Optoelectronics Conference (IMOC)",
    ano:     2025,
  },
  {
    titulo:  "Naval Radar Co-Site EMI Mitigation with a Novel Absorber Metamaterial",
    autores: "A., T. M. D.; B., D. R. R.; MAURÍCIO, W.; Silva, V. N. H.",
    veiculo: "2025 SBMO/IEEE MTTS International Microwave and Optoelectronics Conference (IMOC)",
    ano:     2025,
  },
  {
    titulo:  "Transmission Channel Characterization Using LoRa Device in an Industrial Environment",
    autores: "V., L. M. C.; Silva, V. N. H.; B., S. M. W.; G., C. P. V.; N., F. T.",
    veiculo: "2025 SBMO/IEEE MTTS International Microwave and Optoelectronics Conference (IMOC)",
    ano:     2025,
  },
  {
    titulo:  "Heat and mass transfer with chemical kinetics in alcoholic fermentation of multiple sugars: Lumped formulation and dimensional analysis",
    autores: "Pinheiro, I. F.; Serrano, H. L.; Sphaier, L. A.; Peixoto, F. C.; Silva, V. N. H.",
    veiculo: " · DOI: 10.1016/j.jfoodeng.2023.111863",
    ano:     2024,
  },
  {
    titulo:  "Análise de Endurecimento do Canal e Propagação Favorável em Sistemas MIMO Massivo",
    autores: "Silva, M. d. S. P.; Silva, V. N. H.; Gois, J. N.; Ferreira, T. N.",
    veiculo: "Congresso Brasileiro de Automática",
    ano:     2024,
  },
  {
    titulo:  "Performance of Commercially Available Fluorescent Plastic Optical Fibre Intended to be an ?Optical Antenna?",
    autores: "Maia, B. F. C. B.; Pinheiro, I. L. d. C.; Silva, V. N. H.; Toledo, A.; Ribeiro, R. M.",
    veiculo: "32nd International Conference on Plastic Optical Fibers",
    ano:     2024,
  },
  {
    titulo:  "An Optoeletronic Oscillator Based on Plastic Optical Fiber for Didactic Purpose",
    autores: "Ferreira, V. T.; Andrade, J. R. M. d.; Magri, V. P. R.; Santos, P. A. M. d.; Silva, V. N. H.; Ribeiro, R. M.",
    veiculo: "The 32nd International Conference on Plastic Optical Fibers",
    ano:     2024,
  },
  {
    titulo:  "Determination of carbohydrates in brewer's wort by capillary electrophoresis with indirect UV detection",
    autores: "Aredes, R. S.; Peixoto, F. C.; Sphaier, L. A.; Silva, V. N. H.; Duarte, L. M.; Marques, F. F. d. C.",
    veiculo: " · DOI: 10.1016/j.jfca.2023.105321",
    ano:     2023,
  },
  {
    titulo:  "Neglected frequencies analysis on switching operations in extra-high voltage electrical power substations",
    autores: "B, B. F. H.; L, B. A. P.; HUGO, F. V.; B, D. S. A.; S, D. S. D.; COSTA, P. A. D.; Silva, V. N. H.",
    veiculo: " · DOI: 10.1016/j.epsr.2023.109848",
    ano:     2023,
  },
  {
    titulo:  "Extreme Gradient Boost Regression to Model a SI-POF Link Using OFDM Transmission",
    autores: "N., G. J.; N., S. F. A.; N., F. T.; Silva, V. N. H.; L., B. A. P.; ANET, N. L.",
    veiculo: "2023 International Conference on Optical MEMS and Nanophotonics (OMN) and SBFoton International Optics and Photonics Conference (SBFoton IOPC)",
    ano:     2023,
  },
  {
    titulo:  "Interrogation Technique Using Harmonic Equations in the Electrical Domain for Long Period Grating Sensors",
    autores: "Silva, V. N. H.; ALVES, D. O. V.; WEBER, D. S. G. F.; BESSA, D. S. A.; LOPEZ, B. A. P.; CASCARDO, C. A.",
    veiculo: "2023 SBMO/IEEE MTTS International Microwave and Optoelectronics Conference (IMOC)",
    ano:     2023,
  },
  {
    titulo:  "Acoustic Data Communication Over a Stainless Metallic Rod",
    autores: "S., Z. W.; C., C. A.; Silva, V. N. H.; N., F. T.; L., B. A. P.",
    veiculo: "2023 SBMO/IEEE MTTS International Microwave and Optoelectronics Conference (IMOC)",
    ano:     2023,
  },
  {
    titulo:  "Performance of SMD-LED Array for Visible Light Communications",
    autores: "MARQUES, R. R.; BUCKINGHAM, M. B. F. C.; CHAGAS, P. I. L. D.; TOLEDO, S. A. C. D.; Silva, V. N. H.; BARUCKE, M. C.",
    veiculo: "XLI Simpósio Brasileiro de Telecomunicações e Processamento de Sinais",
    ano:     2023,
  },
  {
    titulo:  "Frequency Response of a Fluorescent Fibre Detector Intended for Visible Light Communications",
    autores: "MARQUES, R. R.; CHAGAS, P. I. L. D.; BUCKINGHAM, M. B. F. C.; MARISTELA, C.; BARUCKE, M. C.; Silva, V. N. H.",
    veiculo: "XLI Simpósio Brasileiro de Telecomunicações e Processamento de Sinais",
    ano:     2023,
  },
  {
    titulo:  "Low Complexity Algorithm for Antenna Selection using Hierarchical Matching Pursuit",
    autores: "JONATHAN, G.; Silva, V. N. H.; TADEU, F.",
    veiculo: "XLI Simpósio Brasileiro de Telecomunicações e Processamento de Sinais",
    ano:     2023,
  },
  {
    titulo:  "Entropy loading for capacity maximization of RGB-based visible light communications",
    autores: "A., L. P.; Silva, V. N. H.; R., M. M. C.; P., G. F.; P., M. P.",
    veiculo: " · DOI: 10.1364/OE.465195",
    ano:     2022,
  },
  {
    titulo:  "A fuzzy approach to LPFG-based optical sensor processing and interrogation",
    autores: "OLIVEIRA, B. F.; Aguiar, E. P. D.; Honório, L. d. M.; Silva, V. N. H.; Barbero, A. P. L.; Santos, A. B. d.",
    veiculo: " · DOI: 10.1109/TIM.2022.3216390",
    ano:     2022,
  },
  {
    titulo:  "Joint Optical Wireless Communication and Localization Using OFDM",
    autores: "B., M. E.; Silva, V. N. H.; P., M. P.; R., M. M. C.",
    veiculo: " · DOI: 10.1109/LPT.2022.3186734",
    ano:     2022,
  },
  {
    titulo:  "Performance of MMSE-LE in 2 Gbaud/s Single Carrier Visible Light Communication using PAM-2",
    autores: "ANDRE, N. S. F.; TADEU, F.; LUIZ, A. N.; PABLO, L. B. A.; MARIA, D. C. R. M.; Silva, V. N. H.",
    veiculo: "2022 13th International Symposium on Communication Systems, Networks and Digital Signal Processing (CSNDSP)",
    ano:     2022,
  },
  {
    titulo:  "Modeling the Bias Current and OFDM Signal Power under Amplitude Constraints for SI-POF",
    autores: "N., G. J.; N., T. J.; N., S. F. A.; N., F. T.; L., B. A. P.; Silva, V. N. H.; ANET, N. L.",
    veiculo: "2022 IEEE LatinAmerican Conference on Communications (LATINCOM)",
    ano:     2022,
  },
  {
    titulo:  "Loading Condition Estimation Using Long-Period Fiber Grating Array",
    autores: "OLIVEIRA, B. F.; RENATO, F.; DEIVID, C.; Silva, V. N. H.; P., L. A.; LEONARDO, D. M. H.; DOS, S. A. B.",
    veiculo: " · DOI: 10.1109/jsen.2020.3042779",
    ano:     2021,
  },
  {
    titulo:  "Dynamic Evolution of Bitterness Units in Beer Worts: Modeling and Concerns",
    autores: "Nascimento, I. C. d.; Calado, L. S.; Bojorge, N.; Silva, V. N. H.; Peixoto, F. C.",
    veiculo: "",
    ano:     2021,
  },
  {
    titulo:  "Modelling of an Optical Access Network Platform for Radio-Frequency Transmission in the S Band / Modelação de uma Plataforma de Rede de Acesso Óptico para Transmissão de Radiofrequências na Banda S",
    autores: "NOGUEIRA, S. F. A.; SANTOS, A. P.; Silva, V. N. H.; NAGASHIMA, F. T.; LUIZ, A. N.; GASPAR, G. A.; RIBEIRO, M. V. P.; LÓPEZ, B. A. P.",
    veiculo: " · DOI: 10.34117/bjdv7n8-227",
    ano:     2021,
  },
  {
    titulo:  "Optical Inclinometer Based on a LPG-Taper Series Configuration",
    autores: "LUIZ, F. F. R.; DOS, S. A. B.; LÓPEZ, B. A. P.; Silva, V. N. H.",
    veiculo: " · DOI: 10.1590/2179-10742021v20i3254754",
    ano:     2021,
  },
  {
    titulo:  "A Point-to-Multi-Point Tracking System for FSO Communication",
    autores: "KIRAN, K. V.; JAYASHREE, P.; KUMAR, T. A.; Silva, V. N. H.; SUDHAN, M.; KUMAR, D. S.",
    veiculo: " · DOI: 10.1109/tim.2021.3115202",
    ano:     2021,
  },
  {
    titulo:  "Real-Time Fermentation Monitoring of Synthetic Beer Wort Using Etched Fiber Bragg Grating",
    autores: "A., D. O. V.; L., B. A. P.; A., S. L.; B., D. S. A.; C., P. F.; Silva, V. N. H.",
    veiculo: " · DOI: 10.1109/tim.2021.3117051",
    ano:     2021,
  },
  {
    titulo:  "Etched Fiber Bragg Grating Probe using a Regular CNC Machine and a 3D Printer",
    autores: "VICENTE, O.; ALEXANDER, C.; ALEXANDRE, S.; Andres, B.; FERNANDO, P.; Silva, V. N. H.",
    veiculo: " · DOI: 10.1364/ao.439995",
    ano:     2021,
  },
  {
    titulo:  "Sondagem em Faixa Estreita e Modelagem de Canal de Propagação Urbano na Faixa de 3,5 GHz",
    autores: "TALITA, C.; Fonseca, F. J. B. d.; Ferreira, T. N.; Matos, L. J. d.; Silva, V. N. H.",
    veiculo: "",
    ano:     2021,
  },
  {
    titulo:  "Antena de Fibra Óptica Plástica como Detectora em Enlaces LiFi",
    autores: "DE, P. J.; MARQUES, R. R.; BARUCKE, M. C.; MARISTELA, C.; Silva, V. N. H.",
    veiculo: "XXXIX Simpósio Brasileiro de Telecomunicações e Processamento de Sinais",
    ano:     2021,
  },
  {
    titulo:  "Development of a capillary electrophoresis method for determination of carbohydrates in wort samples",
    autores: "Aredes, R. S.; Peixoto, F. C.; Sphaier, L. A.; Silva, V. N. H.; Duarte, L. M.; Marques, F. F. d. C.",
    veiculo: "Latin-American Symposium on Biotechnology, Biomedical, Biopharmaceutical, and Industrial Applications of Capillary Electrophoresis and Microchip Technology",
    ano:     2021,
  },
  {
    titulo:  "Optical Triangulation for Free-Space Optics Beam Tracking using Artificial Neural Networks",
    autores: "Bittar, F. H. B.; Garrido, M. A. D.; Nascimento, J. R. d.; BESSA, D. S. A.; Barbero, A. P. L.; Silva, V. N. H.",
    veiculo: "International Symposium on Optomechatronic Technology",
    ano:     2021,
  },
  {
    titulo:  "Simulation and Fabrication of a Low-Cost RFID Reader",
    autores: "L., G. M. V.; P., B. L.; R., M. V. P.; N., F. T.; J., D. M. L.; Silva, V. N. H.",
    veiculo: "2021 IEEE MTTS Latin America Microwave Conference (LAMC)",
    ano:     2021,
  },
  {
    titulo:  "A Mathematical Model for the Interrogation of LPG Fiber Optical Sensors Based on Electrical Harmonic Analysis",
    autores: "XAVIER, N. P.; C., C. A.; P., L. A.; Silva, V. N. H.; M., R. R.; BESSA, D. S. A.",
    veiculo: " · DOI: 10.1109/jsen.2019.2963275",
    ano:     2020,
  },
  {
    titulo:  "High Accuracy Homodyne Interferometric Method for Wide Dynamic Range Applications",
    autores: "C., C. A.; P., L. A.; Silva, V. N. H.; CLAUDIO, K.; H., G. J.; BESSA, D. S. A.",
    veiculo: " · DOI: 10.1109/jsen.2019.2961934",
    ano:     2020,
  },
  {
    titulo:  "Low-Cost Device to Measure Concentration of Saccharomyces cerevisiae</i> Through Methylene Blue Reduction",
    autores: "BESERRA, D. F. R.; Silva, V. N. H.; TREMMEL, M. V.; DOS, S. O. B.; MADALENA, D. A. C. Y.; BATISTA, F. S.",
    veiculo: " · DOI: 10.1109/tim.2019.2923486",
    ano:     2020,
  },
  {
    titulo:  "Correlated Time-Series in Multi-Day-Ahead Streamflow Forecasting Using Convolutional Networks",
    autores: "O., B. F.; Silva, V. N. H.; P., L. A.; LEONARDO, D. M. H.; DOS, S. A. B.",
    veiculo: " · DOI: 10.1109/access.2020.3040942",
    ano:     2020,
  },
  {
    titulo:  "Detecção de Fase Ótica em Interferômetos Homódinos Passivos Usando o Método Jn/Jn+2",
    autores: "Cascardo, A.; Junior, V. L.; CLAUDIO, K.; Galeti, J. H.; Barbero, A. P. L.; Silva, V. N. H.; Ribeiro, R. M.",
    veiculo: "MOMAG 2020",
    ano:     2020,
  },
  {
    titulo:  "Extensão do Método de Triangulação de Potências para Rastreamento de Feixe Ótico em Enlaces FSO",
    autores: "Nascimento, J. R. d.; Bittar, F. H. B.; Garrido, M. A. D.; Filho, W. d. S. G.; Barbero, A. P. L.; Silva, V. N. H.",
    veiculo: "MOMAG 2020",
    ano:     2020,
  },
  {
    titulo:  "Desenvolvimento de um protótipo de Mixer para aplicações na banda S",
    autores: "Sampaio, F. A. N.; Morais, E. R.; Coelho, V. B.; Silva, V. N. H.; Magri, V. P. R.; Ferreira, T. N.",
    veiculo: "MOMAG 2020",
    ano:     2020,
  },
  {
    titulo:  "Receptor de Comunicações por Luz Visível (VLC) Usando Antena de Fibra Óptica Plástica",
    autores: "Batista, A. A. d. C.; Paula, J. O. d.; Barbero, A. P. L.; Leme, C. B. M. P.; Ribeiro, R. M.; Silva, V. N. H.",
    veiculo: "MOMAG 2020",
    ano:     2020,
  },
  {
    titulo:  "Modelling of Discrete Multi-Tone Transmissions over Dispersive Polymeric Optical Fibers",
    autores: "Silva, V. N. H.; Ferreira, T. N.; Sampaio, F. A. N.; Abreu, P.; Neto, L. A.; Barbero, A. P. L.; Ribeiro, R. M.",
    veiculo: "MOMAG 2020",
    ano:     2020,
  },
  {
    titulo:  "Características Optoeletrônicas de Lasers de Diodo Verdes",
    autores: "Marins, F. A.; Silva, V. N. H.; Leme, C. B. M. P.; Ribeiro, R. M.",
    veiculo: "MOMAG 2020",
    ano:     2020,
  },
  {
    titulo:  "Estudo da Transmissão de Frequências Intermediárias (IFs) sobre Fibras Ópticas Plásticas",
    autores: "Marins, F. A.; Silva, V. N. H.; Correia, M.; Ribeiro, R. M.",
    veiculo: "MOMAG 2020",
    ano:     2020,
  },
  {
    titulo:  "Modeling Mass Ttransfer Through a Porous Medium of a Recirculating Mash System",
    autores: "Santos, J.; Sphaier, L. A.; Peixoto, F. C.; Silva, V. N. H.",
    veiculo: "18th Brazilian Congress of Thermal Sciences and Engineering",
    ano:     2020,
  },
  {
    titulo:  "Ajustes Alternativos para Perdas de Percurso em Sondagem Urbana na Faixa de 3,5 GHz",
    autores: "TALITA, C.; FÁBIO, F.; TADEU, F.; Silva, V. N. H.; LENI, M.; PEDRO, C.",
    veiculo: "XXXVIII Simpósio Brasileiro de Telecomunicações e Processamento de Sinais",
    ano:     2020,
  }
];

// ── PATENTES ───────────────────────────────────────────────
//
//  status: "granted" (concedida) | "pending" (em análise)
//
const PATENTES = [
  {
    emoji:  "📋",
    titulo: "DISPOSITIVO ÓTICO PARA DETERMINAÇÃO DA VIABILIDADE CELULAR ATRAVÉS DA REDUÇÃO DO AZUL DE METILENO",
    numero: "2018",
    status: "pending",
  }
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
