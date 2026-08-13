import type { Projeto } from "./types";

/**
 * Projetos — cards no padrão do site da Schema: imagem 16:10 no topo,
 * tag mono + status, título com seta, descrição.
 */

export const projetos: Projeto[] = [
  {
    slug: "agro-ia",
    nome: "Agro IA",
    tipo: "Agronegócio · IA",
    ano: "2025 — 2026",
    resumo:
      "Plataforma de gestão para o agronegócio: mapa de satélite com NDVI, caderno de campo, fiscal, IoT em tempo real e assistente de IA.",
    descricao:
      "Meu maior produto. Do caderno de campo ao monitoramento por satélite, passando por documento fiscal, pecuária e rastreabilidade com QR Code por lote. Decidi arquitetura, modelo de dados, UX e pricing — 219 páginas, 58 módulos, suíte E2E em Playwright.",
    nota:
      "A telemetria IoT chega por WebSocket com reconexão em backoff exponencial — e recusa de autenticação não reconecta, porque rede caída é transitório e token inválido não é. Detalhe pequeno, mas é o tipo de decisão que separa tempo real de demo de tempo real de produção.",
    stack: ["Next.js 15", "TypeScript", "Django", "WebSocket", "PostgreSQL", "Playwright"],
    imagem: "/agro-mapa.gif",
    destaque: true,
    verificacao: "confirmado",
  },
  {
    slug: "schema",
    nome: "Schema",
    tipo: "Conhecimento · IA",
    ano: "2026",
    resumo:
      "Infraestrutura de conhecimento: a empresa sobe os documentos e ganha especialistas de IA que respondem com base neles — sempre com a fonte.",
    descricao:
      "O Schema Core é a base reutilizável sobre a qual os produtos nascem — RAG com busca vetorial, multi-tenant por workspace desde a primeira linha. O assistente do Agro IA é construído sobre essa mesma fundação.",
    stack: ["Next.js", "TypeScript", "RAG", "pgvector", "Supabase"],
    imagem: "/schema-capa.png",
    link: "https://website-schema.vercel.app/",
    destaque: true,
    verificacao: "confirmado",
  },
  {
    slug: "inclusao-pcd",
    nome: "Inclusão de PCDs em tech",
    tipo: "UX Research",
    ano: "2021",
    resumo:
      "Pesquisa e protótipo sobre inclusão de pessoas com deficiência no mercado de tecnologia.",
    descricao:
      "Começou pela pesquisa, não pela tela: entrevistas com profissionais PCD e RH, matriz CSD, personas e canvas de valor. A solução levou acessibilidade ao limite — style guide, UX writing e heurísticas aplicadas do wireframe ao protótipo de alta.",
    stack: ["Pesquisa", "WCAG", "Figma", "Design system"],
    verificacao: "confirmado",
  },
];

export const projetosDestaque = projetos.filter((p) => p.destaque);
export const projetosGrade = projetos.filter((p) => !p.destaque);
