import type { GrupoStack, ItemTrajetoria } from "./types";

export const perfil = {
  nome: "Joane Alves Ribeiro",
  cargo: "Software Engineer",
  local: "Belo Horizonte, MG",
  email: "joanealves2011@gmail.com",
  github: "https://github.com/joanealves",
  linkedin: "https://www.linkedin.com/in/joane-alves-ribeiro/",
  site: "https://joanealves.vercel.app",
  /** Duas linhas no hero. Descreve o trabalho, não vende. */
  intro:
    "Foco em frontend — React, Next.js e TypeScript — com background fullstack em Python e Django. Design desde 2014, código desde 2020.",
} as const;

export const trajetoria: ItemTrajetoria[] = [
  {
    periodo: "2026 — atual",
    empresa: "Realize",
    papel: "Frontend Developer & Product Owner",
    descricao:
      "Desenvolvimento e evolução da arquitetura frontend, com revisão de código e apoio técnico ao time. Também conduzo sprints, backlog e a relação com stakeholders.",
    atual: true,
  },
  {
    periodo: "2025 — 2026",
    empresa: "Trexx",
    papel: "Frontend Developer",
    descricao:
      "Aplicações web em Next.js, com integração de APIs e padronização de componentes reutilizáveis. Participei das decisões de UX/UI junto ao time de produto.",
  },
  {
    periodo: "2022 — 2025",
    empresa: "VD Engenharia Visual",
    papel: "Full Stack & UX Design",
    descricao:
      "Desenvolvimento evolutivo de ERPs e sistemas sob demanda, atuando em duas frentes: fullstack em uma equipe e UX/UI dos novos produtos em outra.",
  },
  {
    periodo: "2021 — 2022",
    empresa: "Newtab Academy",
    papel: "Full Stack",
    descricao:
      "Projetos front e back de forma incremental — React, TypeScript, Styled Components, integração com APIs e banco relacional.",
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
    papel: "Web Design, motion e vídeo",
    descricao:
      "Identidade visual, branding, wireframe e prototipagem. É de onde vem a forma como eu trato tipografia, hierarquia e acessibilidade até hoje.",
  },
];

export const stack: GrupoStack[] = [
  {
    titulo: "Frontend",
    itens: [
      "React",
      "Next.js",
      "TypeScript",
      "Vite",
      "Tailwind",
      "shadcn/ui",
      "Styled Components",
      "PWA",
    ],
  },
  {
    titulo: "Backend",
    itens: ["Python", "Django", "FastAPI", "Node.js", "REST", "PostgreSQL", "MongoDB"],
  },
  {
    titulo: "Design",
    itens: ["Figma", "Design system", "Wireframes", "Acessibilidade (WCAG)"],
  },
  {
    titulo: "Outros",
    itens: ["Git", "Playwright", "Agile / Scrum", "SEO"],
  },
];
