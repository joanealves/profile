import { FileCode2 } from "lucide-react";
import type { Case } from "@/content/types";

/**
 * O componente central do site.
 *
 * A estrutura visual força a narrativa: contexto → decisão → trade-off → resultado.
 * Cada etapa é uma linha rotulada, então o leitor que escaneia em 2 minutos
 * consegue pular direto para "Decisão" e "Trade-off" — que é o que um tech lead lê.
 */

const ETAPAS = [
  { chave: "contexto", rotulo: "Contexto" },
  { chave: "decisao", rotulo: "Decisão" },
  { chave: "tradeoff", rotulo: "Trade-off" },
  { chave: "resultado", rotulo: "Resultado" },
] as const;

export function CaseCard({ caso }: { caso: Case }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-line-strong hover:bg-surface-hover sm:p-9 ${
        caso.destaque ? "glow-accent" : ""
      }`}
    >
      {/* Linha de acento que cresce da esquerda no hover (brief) */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px w-0 bg-gradient-to-r from-accent to-transparent transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:w-full"
      />

      <header>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-faint">
          <span className="font-medium text-ink-muted">{caso.organizacao}</span>
          <span aria-hidden="true">·</span>
          <span>{caso.periodo}</span>
          <span aria-hidden="true">·</span>
          <span>{caso.papel}</span>
        </p>

        <h3 className="mt-3 text-balance text-2xl font-semibold leading-snug tracking-tight sm:text-[1.75rem]">
          {caso.titulo}
        </h3>

        <p className="mt-3 text-pretty leading-relaxed text-ink-muted">
          {caso.resumo}
        </p>
      </header>

      {caso.metricas.length > 0 && (
        <dl className="mt-7 flex flex-wrap gap-3">
          {caso.metricas.map((m) => (
            <div
              key={m.rotulo}
              className="rounded-[var(--radius-chip)] border border-line bg-base-raised px-4 py-3"
            >
              <dt className="sr-only">{m.rotulo}</dt>
              <dd>
                <span className="block font-mono text-lg font-semibold text-accent-soft">
                  {m.valor}
                </span>
                <span className="mt-0.5 block text-xs text-ink-faint">
                  {m.rotulo}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-8 space-y-5 border-t border-line pt-7">
        {ETAPAS.map(({ chave, rotulo }) => (
          <div key={chave} className="sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-5">
            <p className="text-sm font-medium uppercase tracking-wide text-ink-faint">
              {rotulo}
            </p>
            <p className="mt-1 text-pretty leading-relaxed text-ink-muted sm:mt-0">
              {caso[chave]}
            </p>
          </div>
        ))}
      </div>

      {caso.evidencia && (
        <p className="mt-7 flex items-start gap-3 rounded-[var(--radius-chip)] border border-line bg-base-raised p-4 text-sm">
          <span
            className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-accent/12 text-accent"
            aria-hidden="true"
          >
            <FileCode2 className="size-3.5" />
          </span>
          <span>
            <span className="font-mono text-ink">{caso.evidencia.rotulo}</span>
            <span className="text-ink-faint"> — {caso.evidencia.detalhe}</span>
          </span>
        </p>
      )}

      <ul className="mt-7 flex flex-wrap gap-2" aria-label="Tecnologias envolvidas">
        {caso.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-[var(--radius-pill)] border border-line px-3 py-1 text-xs text-ink-faint transition-colors duration-300 group-hover:border-line-strong group-hover:text-ink-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
