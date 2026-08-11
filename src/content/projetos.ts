import type { Projeto } from "./types";

/**
 * Projetos do site.
 *
 * Tom: mostrar o trabalho. Descrever o que é e o que foi construído,
 * sem discurso de venda e sem prometer contratação.
 *
 * Regra: nada com `verificacao: "pendente"` vai ao ar sem Joane confirmar.
 */

export const projetos: Projeto[] = [
  {
    slug: "agro-ia",
    nome: "Agro IA",
    tipo: "Produto próprio",
    ano: "2025 — 2026",
    resumo:
      "Plataforma de gestão para produtores rurais — do caderno de campo ao monitoramento por satélite e sensores.",
    descricao:
      "Um SaaS que junta numa coisa só o que o produtor hoje resolve em planilhas soltas: gestão de fazenda e talhões, safra, estoque, pecuária, documento fiscal e monitoramento ambiental. Tem mapa com histórico NDVI por talhão, leitura de sensores IoT chegando em tempo real e um assistente de IA, o Tião, que responde sobre os dados da própria fazenda. Defini a arquitetura, o modelo de dados, a UX e o pricing.",
    nota:
      "A conexão no campo cai o tempo todo, então a reconexão do WebSocket trata queda de rede e sessão expirada de formas diferentes — a primeira tenta de novo com backoff, a segunda para e avisa. Reconectar em loop quando o servidor recusou por auth só gera carga e esconde o erro real de quem está usando.",
    stack: [
      "Next.js 15",
      "TypeScript",
      "Django REST",
      "WebSocket",
      "PostgreSQL",
      "Leaflet",
      "Playwright",
    ],
    destaque: true,
    verificacao: "confirmado",
  },
  {
    slug: "schema",
    nome: "Schema",
    tipo: "Produto próprio",
    ano: "2026",
    resumo:
      "Infraestrutura de conhecimento para empresas: a ideia é que uma empresa não perca aquilo que ela já sabe.",
    descricao:
      "O Schema Core é a base reutilizável sobre a qual os produtos são construídos. Na versão atual você sobe documentos, pergunta, e a resposta vem com a fonte junto — RAG com busca vetorial. Multi-tenant por workspace desde a primeira linha, decisão tomada no começo justamente para não ter que reescrever tudo depois que existisse cliente. Os especialistas digitais, como o Tião do Agro IA, nascem dessa base.",
    stack: ["Next.js", "TypeScript", "RAG", "pgvector", "Supabase", "Multi-tenant"],
    link: "https://website-schema.vercel.app/",
    destaque: true,
    verificacao: "confirmado",
  },
  {
    slug: "inclusao-pcd",
    nome: "Inclusão de PCDs no mercado de tecnologia",
    tipo: "Projeto de UX",
    ano: "2021",
    resumo:
      "Pesquisa e protótipo sobre inclusão de pessoas com deficiência em vagas de tecnologia.",
    descricao:
      "Projeto em grupo que começou pela pesquisa, não pela tela: questionários e entrevistas com profissionais PCD e com gente de RH, matriz CSD, mapa de empatia, personas e canvas de valor. A solução foi um site levando acessibilidade ao limite do que a gente conseguia — style guide, design system, UX writing e heurísticas de usabilidade aplicadas de ponta a ponta, do wireframe ao protótipo de alta fidelidade.",
    stack: ["Pesquisa com usuário", "WCAG", "Figma", "Design system", "Prototipagem"],
    verificacao: "confirmado",
  },
  {
    slug: "eyecare-ai",
    nome: "EyeCare AI",
    tipo: "Exploração",
    ano: "2025",
    resumo:
      "Monitoramento de saúde ocular e postura por visão computacional, durante o uso do computador.",
    descricao:
      "Usa a webcam para acompanhar sinais de fadiga visual e postura ao longo do dia, avisando quando é hora de parar. Nasceu de um incômodo pessoal com jornada longa de tela.",
    stack: ["Python", "OpenCV", "MediaPipe", "Pillow"],
    imagem: "/eye.png",
    verificacao: "confirmado",
  },
  {
    slug: "geoview",
    nome: "GeoView",
    tipo: "Exploração",
    ano: "2025",
    resumo: "Visualização geoespacial de terremotos em tempo real.",
    descricao:
      "Consome dados sismográficos públicos e joga num mapa interativo, com filtro por magnitude e período. Foi onde eu aprendi a lidar com volume grande de ponto num mapa sem travar o navegador.",
    stack: ["React", "Mapbox", "D3.js"],
    imagem: "/geo.gif",
    link: "https://geoview-pj9a.vercel.app/",
    repo: "https://github.com/joanealves/geoview",
    verificacao: "confirmado",
  },
  {
    slug: "ai-analyst",
    nome: "AI Analyst",
    tipo: "Exploração",
    ano: "2025",
    resumo: "Leitura e análise automática de PDFs com IA.",
    descricao:
      "Extrai o texto de documentos PDF e devolve palavras-chave, sentimento e padrões — a ideia era ler relatório longo sem ter que ler relatório longo.",
    stack: ["Python", "LangChain", "OpenAI", "Streamlit"],
    imagem: "/capa-ia.png",
    repo: "https://github.com/joanealves/ia-analyst",
    verificacao: "confirmado",
  },
];

export const projetosDestaque = projetos.filter((p) => p.destaque);
export const projetosGrade = projetos.filter((p) => !p.destaque);

/** Guarda de publicação: lista o que ainda não pode ir ao ar. */
export function pendenciasDeConteudo(): string[] {
  return projetos
    .filter((p) => p.verificacao === "pendente")
    .map((p) => `${p.slug}: aguardando confirmação`);
}
