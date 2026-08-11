import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import type { Projeto } from "@/content/types";

/**
 * Card de projeto.
 *
 * Segue o padrão do lp-modulo-card do Agro: radius 20px, lift de 7px no hover
 * com curva 350ms, linha de acento que cresce no topo, e a variante destaque
 * com fundo mais escuro e glow radial — o "central" do original.
 */
export function ProjetoCard({ projeto }: { projeto: Projeto }) {
  const destaque = projeto.destaque;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border p-7 transition-[transform,box-shadow,border-color] duration-[350ms] ease-[var(--ease-out-soft)] hover:-translate-y-[7px] sm:p-9 ${
        destaque
          ? "border-line-strong bg-[radial-gradient(120%_90%_at_50%_-20%,color-mix(in_oklab,var(--color-accent)_18%,transparent)_0%,transparent_55%),linear-gradient(170deg,var(--color-surface)_0%,var(--color-base-raised)_100%)] hover:border-accent/45 hover:shadow-[0_26px_52px_-14px_rgba(0,0,0,.6)]"
          : "border-line bg-surface hover:border-line-strong hover:bg-surface-hover hover:shadow-[0_14px_40px_-12px_rgba(0,0,0,.5)]"
      }`}
    >
      {/* Linha de acento no topo, cresce da esquerda no hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] w-0 bg-gradient-to-r from-accent via-accent-soft to-transparent transition-[width] duration-500 ease-[var(--ease-out-soft)] group-hover:w-full"
      />

      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-faint">
        <span>{projeto.tipo}</span>
        <span aria-hidden="true">·</span>
        <span>{projeto.ano}</span>
      </p>

      <h3
        className={`mt-3 text-balance font-semibold tracking-tight ${
          destaque ? "text-3xl sm:text-4xl" : "text-xl"
        }`}
      >
        {projeto.nome}
      </h3>

      <p
        className={`mt-3 text-pretty leading-relaxed ${
          destaque ? "text-lg text-ink-muted" : "text-ink-muted"
        }`}
      >
        {projeto.resumo}
      </p>

      {projeto.imagem && (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[var(--radius-chip)] border border-line bg-base-raised">
          <Image
            src={projeto.imagem}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[350ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
            unoptimized
          />
        </div>
      )}

      <p className="mt-5 text-pretty leading-relaxed text-ink-muted">
        {projeto.descricao}
      </p>

      {projeto.nota && (
        <p className="mt-5 border-l-2 border-accent/40 pl-4 text-pretty leading-relaxed text-ink-muted">
          {projeto.nota}
        </p>
      )}

      <ul
        className="mt-6 flex flex-wrap gap-2"
        aria-label={`Tecnologias de ${projeto.nome}`}
      >
        {projeto.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-[var(--radius-pill)] border border-line px-3 py-1 text-xs text-ink-faint transition-colors duration-300 group-hover:border-line-strong group-hover:text-ink-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      {(projeto.link || projeto.repo) && (
        <div className="mt-7 flex flex-wrap items-center gap-5 pt-1">
          {projeto.link && (
            <a
              href={projeto.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft transition-colors duration-300 hover:text-accent"
            >
              Ver o projeto
              <ArrowUpRight
                className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                aria-hidden="true"
              />
              <span className="sr-only"> — {projeto.nome}, abre em nova aba</span>
            </a>
          )}

          {projeto.repo && (
            <a
              href={projeto.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors duration-300 hover:text-ink"
            >
              <Github className="size-4" aria-hidden="true" />
              Código
              <span className="sr-only"> — {projeto.nome}, abre em nova aba</span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}
