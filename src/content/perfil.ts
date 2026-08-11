import type { GrupoStack, ItemTrajetoria } from "./types";

export const perfil = {
  nome: "Joane Alves Ribeiro",
  cargo: "Software Engineer",
  eyebrow: "Software Engineer · Frontend Sênior & Produto",
  local: "Belo Horizonte, MG",
  email: "joanealves2011@gmail.com",
  github: "https://github.com/joanealves",
  linkedin: "https://www.linkedin.com/in/joane-alves-ribeiro/",
  site: "https://joanealves.vercel.app",
} as const;

/** Hero — a headline diz o que eu faço; a palavra em gradiente é o foco. */
export const hero = {
  titulo: ["Construo ", "produtos digitais", " da arquitetura à interface."],
  subtitulo:
    "Engenheira de software com base em design desde 2014. Hoje conduzo frontend e produto na Realize e construo dois SaaS próprios — Agro IA e Schema — decidindo arquitetura, UX e modelo de negócio.",
  janela: {
    titulo: "agro-ia · mapa de satélite",
    badge: "Produto próprio",
    imagem: "/agro-mapa.gif",
    alt: "Agro IA — mapa de satélite com análise NDVI por talhão",
  },
} as const;

export const faixaConfianca =
  "Frontend · Arquitetura · Produto · UX · IA · Acessibilidade";

/** Quem sou — texto da coluna esquerda + grade 2x2. */
export const sobre = {
  titulo: "Doze anos entre o design e a engenharia.",
  paragrafos: [
    "Comecei no design em 2014 — identidade visual, motion, interfaces — e migrei para o código para construir o que desenhava. Essa dupla formação define como eu trabalho até hoje: arquitetura pensada desde o wireframe, interface pensada desde o modelo de dados.",
    "Na Realize atuo como frontend sênior e Product Owner: conduzo o time de produto, backlog, sprints e stakeholders, junto da evolução da arquitetura frontend, revisão de código e apoio técnico ao time.",
  ],
  pilares: [
    ["Frontend sênior", "React, Next.js e TypeScript em produção"],
    ["Produto & liderança", "Backlog, sprints e time de produto"],
    ["UX & design system", "Do wireframe ao componente"],
    ["Backend & IA", "Python, Django e RAG aplicado"],
  ],
  foto: {
    src: "/perfil.jpg",
    alt: "Joane Alves Ribeiro",
  },
} as const;

/** O que eu faço — seis capacidades, com nome de ícone lucide. */
export const capacidades = [
  {
    icone: "Blocks",
    titulo: "Arquitetura frontend",
    desc: "Aplicações Next.js e React estruturadas para durar: modulares, tipadas e testáveis, com decisões documentadas.",
  },
  {
    icone: "PenTool",
    titulo: "Design systems & UI",
    desc: "Componentes reutilizáveis e consistência visual em produtos grandes — a ponte entre o Figma e o código.",
  },
  {
    icone: "Users",
    titulo: "Produto & liderança técnica",
    desc: "Condução de time, backlog e sprint, revisão de código e mentoria. Visão de produto com pé na engenharia.",
  },
  {
    icone: "Radio",
    titulo: "Tempo real & integrações",
    desc: "WebSocket resiliente, APIs REST e integração front-back que aguenta rede instável sem degradar a experiência.",
  },
  {
    icone: "BrainCircuit",
    titulo: "IA aplicada",
    desc: "RAG, assistentes e automação com IA dentro de produto real — respondendo com fonte, não com achismo.",
  },
  {
    icone: "Accessibility",
    titulo: "Acessibilidade",
    desc: "WCAG como requisito de engenharia: contraste, teclado, semântica e reduced-motion desde o primeiro commit.",
  },
] as const;

/** Como eu trabalho — quatro passos, com linha conectora no desktop. */
export const processo = [
  {
    icone: "Compass",
    passo: "01",
    titulo: "Descobrir",
    desc: "Entendo o problema de negócio antes de escrever qualquer linha de código.",
  },
  {
    icone: "DraftingCompass",
    passo: "02",
    titulo: "Projetar",
    desc: "Arquitetura, UX e escopo desenhados para escalar — não só para funcionar.",
  },
  {
    icone: "Hammer",
    passo: "03",
    titulo: "Construir",
    desc: "Entrega contínua com revisão de código, testes e padrão de qualidade explícito.",
  },
  {
    icone: "TrendingUp",
    passo: "04",
    titulo: "Evoluir",
    desc: "Medir, aprender e evoluir o produto junto do negócio — o lançamento é o começo.",
  },
] as const;

export const trajetoria: ItemTrajetoria[] = [
  {
    periodo: "2026 — atual",
    empresa: "Realize",
    papel: "Frontend Sênior & Product Owner",
    descricao:
      "Conduzo o time de produto — backlog, sprints e stakeholders — e a evolução da arquitetura frontend, com revisão de código e apoio técnico ao time. Na prática, a ponte entre a engenharia e o negócio.",
    atual: true,
  },
  {
    periodo: "2025 — 2026",
    empresa: "Trexx",
    papel: "Frontend Developer",
    descricao:
      "Aplicações Next.js com foco em performance: otimizei páginas críticas, padronizei componentes reutilizáveis e participei das decisões de UX junto ao time de produto.",
  },
  {
    periodo: "2022 — 2025",
    empresa: "VD Engenharia Visual",
    papel: "Full Stack & UX Design",
    descricao:
      "Dois anos e meio em duas frentes: desenvolvimento evolutivo de ERPs e sistemas sob demanda, e o UX dos novos produtos da empresa — do discovery à documentação.",
  },
  {
    periodo: "2021 — 2022",
    empresa: "Newtab Academy",
    papel: "Full Stack",
    descricao:
      "Projetos front e back incrementais com React, TypeScript e integração de APIs — a transição definitiva do design para a engenharia.",
  },
  {
    periodo: "2020 — 2021",
    empresa: "Agência 1010",
    papel: "Web Design",
    descricao:
      "Layout e desenvolvimento de sites e landing pages, identidade visual e motion para campanhas.",
  },
  {
    periodo: "2014 — 2023",
    empresa: "Amorim Studio · autônomo",
    papel: "Design, motion e vídeo",
    descricao:
      "Nove anos de identidade visual, branding e prototipagem — a base que sustenta como eu trato tipografia, hierarquia e acessibilidade até hoje.",
  },
];

export const stack: GrupoStack[] = [
  {
    titulo: "Frontend",
    itens: ["React", "Next.js", "TypeScript", "Vite", "Tailwind", "shadcn/ui", "PWA"],
  },
  {
    titulo: "Backend",
    itens: ["Python", "Django", "FastAPI", "Node.js", "PostgreSQL", "MongoDB"],
  },
  {
    titulo: "Qualidade",
    itens: ["Playwright", "Code review", "WCAG / A11Y", "Lighthouse"],
  },
  {
    titulo: "Produto & Design",
    itens: ["Figma", "Design system", "Scrum", "Discovery"],
  },
];
