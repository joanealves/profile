import type { Case } from "./types";

/**
 * OS TRÊS CASES — coração do site.
 *
 * Regra de conteúdo: nenhum número entra aqui sem fonte defensável em entrevista.
 * Campos marcados `verificacao: "pendente"` estão com texto provisório e
 * PRECISAM da confirmação de Joane antes de publicar.
 *
 * Já verificado por leitura de código em d:\projetos\agro_ia\agro_ia:
 *   - useIoTWebSocket.ts  → backoff exponencial (teto 30s), corte de reconexão
 *                           em close 4001/4003, callbacks em ref, guarda de unmount
 *   - playwright.config.ts → storage state via projeto `setup`, retries só em CI,
 *                            locale pt-BR + timezone America/Sao_Paulo fixados
 */

export const cases: Case[] = [
  {
    slug: "tempo-real-resiliente",
    periodo: "2025 — 2026",
    organizacao: "Agro IA",
    papel: "Arquitetura frontend e decisão de produto",
    titulo: "Telemetria IoT que sobrevive à rede do campo",
    resumo:
      "Sensores em fazenda perdem conexão o tempo todo. O painel precisava distinguir queda de rede de sessão expirada — e reagir diferente a cada uma.",
    contexto:
      "O módulo de IoT do Agro IA transmite leituras de sensores por WebSocket para o painel. O ambiente real é conectividade rural instável: a conexão cai sozinha, várias vezes por hora. Reconexão ingênua em loop derruba o backend com uma tempestade de tentativas quando muitos dispositivos caem juntos, e mascara o caso em que o servidor recusou a conexão de propósito.",
    decisao:
      "Escrevi um hook único (useIoTWebSocket) que trata reconexão como máquina de estados, não como retry. Backoff exponencial partindo de 2s com teto de 30s, resetado a cada conexão bem-sucedida. O ponto central: close codes 4001 e 4003 — recusa de autenticação — não reconectam. Rede caiu é transitório e merece nova tentativa; token inválido é permanente e novas tentativas só geram carga inútil e escondem o erro real do usuário. Os callbacks de leitura e alerta ficam em ref, então o componente pai pode re-renderizar sem derrubar e reabrir o socket.",
    tradeoff:
      "Callbacks em ref custam legibilidade — é um padrão que exige comentário, porque contraria a expectativa de dependência do useEffect. Aceitei porque a alternativa era reabrir a conexão a cada render do pai, o que em um painel com atualização constante significaria reconectar sem parar. Teto de 30s no backoff também é escolha: acima disso o usuário percebe o painel como morto, abaixo a tempestade de reconexão volta.",
    resultado:
      "Uma superfície só de tempo real para todo o app, tipada com union discriminado entre leitura e alerta. Reconexão silenciosa em queda de rede, erro explícito em falha de auth, e sem reconexão zumbi no StrictMode do React 19.",
    metricas: [
      {
        valor: "2s → 30s",
        rotulo: "backoff exponencial com teto",
        fonte: "useIoTWebSocket.ts:54,116 — lido no código",
        verificacao: "verificado-em-codigo",
      },
      {
        valor: "4001 / 4003",
        rotulo: "close codes que não reconectam",
        fonte: "useIoTWebSocket.ts:114 — lido no código",
        verificacao: "verificado-em-codigo",
      },
    ],
    stack: ["TypeScript", "React 19", "WebSocket", "Django Channels", "Next.js 15"],
    evidencia: {
      rotulo: "useIoTWebSocket.ts",
      detalhe: "Hook de 134 linhas; backoff, corte por close code e guarda de unmount",
    },
    destaque: true,
  },
  {
    slug: "suite-e2e-confiavel",
    periodo: "2025 — 2026",
    organizacao: "Agro IA",
    papel: "Arquitetura de testes",
    titulo: "Suíte E2E que não mente",
    resumo:
      "Teste que falha sem motivo é pior que teste nenhum: o time para de olhar. A suíte foi desenhada para que uma falha signifique sempre um bug.",
    contexto:
      "Painel com fluxos longos e dependentes de sessão — autenticação, caderno de campo, dashboard, NDVI, receituário. Testar cada fluxo passando pelo login refazia o mesmo trabalho em toda spec, deixava a suíte lenta e criava um ponto único de falha: qualquer instabilidade no login quebrava tudo.",
    decisao:
      "Separei a autenticação num projeto `setup` do Playwright que roda uma vez, persiste o storage state e é declarado como dependência dos demais projetos. As specs de negócio começam já autenticadas. Junto disso, fixei locale pt-BR e timezone America/Sao_Paulo na config: formato de data e número deixa de depender da máquina que roda o teste. Retries ficam só em CI — localmente uma falha tem que doer na hora, em CI ela precisa distinguir flake de regressão real.",
    tradeoff:
      "Storage state compartilhado significa que as specs não testam o fluxo de login em si — por isso ele tem spec própria e dedicada. Também acopla a suíte ao formato do estado de sessão: se a autenticação mudar, o setup quebra antes de tudo. Preferi esse acoplamento explícito e num lugar só a repetir login em cinco arquivos.",
    resultado:
      "Cinco specs cobrindo os fluxos críticos, rodando em paralelo com quatro workers no ambiente local. Trace gravado na primeira repetição e screenshot só em falha — depurar uma quebra de CI não exige reproduzir localmente.",
    metricas: [
      {
        valor: "5",
        rotulo: "specs de fluxo crítico",
        fonte: "e2e/ — auth, caderno, dashboard, ndvi, receituario",
        verificacao: "verificado-em-codigo",
      },
      {
        valor: "PENDENTE",
        rotulo: "testes passando na última execução",
        fonte: "README declara 47/47 em 15/05/2026 — RODAR a suíte e confirmar antes de publicar",
        verificacao: "pendente",
      },
    ],
    stack: ["Playwright", "TypeScript", "CI", "Next.js 15"],
    evidencia: {
      rotulo: "playwright.config.ts",
      detalhe: "Projeto setup com storage state, locale e timezone fixados, retries só em CI",
    },
  },
  {
    slug: "plataforma-prestacao-contas",
    periodo: "2022 — 2025",
    organizacao: "VD Engenharia Visual",
    papel: "Full Stack e UX",
    titulo: "Acompanhamento de obras sob auditoria do Ministério Público",
    resumo:
      "Plataforma de acompanhamento das obras de reparação da Vale, com prestação de contas a stakeholder externo. Dado errado na tela tem consequência jurídica.",
    contexto:
      "PENDENTE — precisa da sua confirmação. O que sei do brief: acompanhamento em tempo real das obras de reparação da Vale, com prestação de contas ao Ministério Público, alto rigor, stakeholders externos e dado sensível. Falta o problema técnico concreto que você resolveu.",
    decisao:
      "PENDENTE — a decisão de arquitetura que você tomou aqui. Perguntas que respondem isso: como garantiu que o número na tela batia com a fonte? Como tratou permissão entre quem edita e quem audita? Teve versionamento ou trilha de auditoria do dado?",
    tradeoff:
      "PENDENTE — o que você abriu mão em troca.",
    resultado:
      "PENDENTE — o que mudou depois.",
    metricas: [
      {
        valor: "PENDENTE",
        rotulo: "a definir com Joane",
        fonte: "entrevista pendente",
        verificacao: "pendente",
      },
    ],
    stack: ["React", "Python", "PostgreSQL"],
  },
];

/** Guarda de publicação: lista o que ainda não pode ir ao ar. */
export function pendenciasDeConteudo(): string[] {
  const pendencias: string[] = [];

  for (const c of cases) {
    const camposPendentes = (["contexto", "decisao", "tradeoff", "resultado"] as const).filter(
      (campo) => c[campo].startsWith("PENDENTE"),
    );

    if (camposPendentes.length > 0) {
      pendencias.push(`${c.slug}: ${camposPendentes.join(", ")}`);
    }

    for (const m of c.metricas) {
      if (m.verificacao === "pendente") {
        pendencias.push(`${c.slug} · métrica "${m.rotulo}": ${m.fonte}`);
      }
    }
  }

  return pendencias;
}
