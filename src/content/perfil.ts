import type { GrupoStack, ItemTrajetoria, PraticaTrabalho } from "./types";

export const perfil = {
  nome: "Joane Alves Ribeiro",
  cargo: "Senior Frontend Engineer",
  local: "Belo Horizonte, MG · Remoto",
  email: "joanealves2011@gmail.com",
  github: "https://github.com/joanealves",
  linkedin: "https://www.linkedin.com/in/joane-alves-ribeiro/",
  site: "https://joanealves.vercel.app",
  /** Posicionamento: o que eu resolvo, não que ferramentas eu uso. */
  posicionamento:
    "Arquitetura de UI, tempo real resiliente e acessibilidade em produtos que precisam funcionar quando a rede não colabora.",
} as const;

export const trajetoria: ItemTrajetoria[] = [
  {
    periodo: "05/2026 — atual",
    empresa: "Realize",
    papel: "Frontend Developer & Product Owner",
    descricao:
      "Evolução da arquitetura frontend e revisão de código, junto da condução de sprints, gestão de backlog e relação com stakeholders. Lidero o time de produto.",
    atual: true,
  },
  {
    periodo: "07/2025 — 04/2026",
    empresa: "Trexx",
    papel: "Frontend Developer",
    descricao: "PENDENTE — preciso de uma decisão técnica sua desse período.",
  },
  {
    periodo: "12/2022 — 05/2025",
    empresa: "VD Engenharia Visual",
    papel: "Full Stack & UX Design",
    descricao:
      "Plataforma de acompanhamento das obras de reparação da Vale, com prestação de contas ao Ministério Público — stakeholder externo e dado sensível.",
  },
  {
    periodo: "05/2021 — 08/2022",
    empresa: "Newtab Academy",
    papel: "Full Stack",
    descricao: "Desenvolvimento de aplicações web ponta a ponta.",
  },
  {
    periodo: "09/2020 — 10/2021",
    empresa: "Agência 1010",
    papel: "Web Design",
    descricao: "Interfaces e identidade visual para clientes da agência.",
  },
  {
    periodo: "2014 — 2023",
    empresa: "Amorim Studio · autônomo",
    papel: "Web Design, motion e vídeo",
    descricao:
      "Base de design que sustenta como trato hierarquia visual, tipografia e acessibilidade até hoje.",
  },
];

export const stack: GrupoStack[] = [
  {
    titulo: "Frontend",
    itens: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Vite",
      "Tailwind",
      "shadcn/ui",
      "Styled Components",
      "PWA",
    ],
  },
  {
    titulo: "Tempo real e dados",
    itens: ["WebSocket", "REST", "TanStack Query", "Axios", "PostgreSQL", "MongoDB"],
  },
  {
    titulo: "Backend",
    itens: ["Python", "FastAPI", "Django", "Node.js"],
  },
  {
    titulo: "Qualidade",
    itens: ["Playwright", "Testes E2E", "Code review", "WCAG / A11Y", "Lighthouse"],
  },
  {
    titulo: "Design",
    itens: ["Figma", "Design system", "Wireframes", "Acessibilidade"],
  },
];

/** Ícones são nomes de lucide-react — SVG stroke dentro de chip, nunca emoji. */
export const comoTrabalho: PraticaTrabalho[] = [
  {
    titulo: "Decisão antes de biblioteca",
    descricao:
      "Toda escolha de arquitetura entra com o trade-off escrito. Se não consigo defender o que perdi, não é decisão — é preferência.",
    icone: "GitBranch",
  },
  {
    titulo: "Acessibilidade como requisito",
    descricao:
      "Contraste, foco visível, navegação por teclado, HTML semântico e prefers-reduced-motion. Este site passa no próprio discurso.",
    icone: "Accessibility",
  },
  {
    titulo: "Teste que significa algo",
    descricao:
      "Suíte desenhada para que falha seja sempre bug, nunca ruído. Estado de sessão isolado, locale e timezone fixados.",
    icone: "ShieldCheck",
  },
  {
    titulo: "Review e mentoria",
    descricao:
      "Revisão de código como canal de padrão técnico do time, não como filtro de erro. Apoio técnico e evolução de arquitetura.",
    icone: "Users",
  },
];
