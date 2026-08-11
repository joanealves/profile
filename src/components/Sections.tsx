import {
  Accessibility,
  ArrowUpRight,
  GitBranch,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { comoTrabalho, perfil, stack, trajetoria } from "@/content/perfil";

/** Mapa explícito: sem componente dinâmico por string, o bundler faz tree-shaking. */
const ICONES: Record<string, LucideIcon> = {
  GitBranch,
  Accessibility,
  ShieldCheck,
  Users,
};

function TituloSecao({
  sobretitulo,
  titulo,
  descricao,
  id,
}: {
  sobretitulo: string;
  titulo: string;
  descricao?: string;
  id: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {sobretitulo}
      </p>
      <h2
        id={id}
        className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {titulo}
      </h2>
      {descricao && (
        <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
          {descricao}
        </p>
      )}
    </div>
  );
}

export function ComoTrabalho() {
  return (
    <section
      id="como-trabalho"
      aria-labelledby="como-trabalho-titulo"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <TituloSecao
        id="como-trabalho-titulo"
        sobretitulo="Prática"
        titulo="Como eu trabalho"
        descricao="O que eu levo para um time, independente do produto."
      />

      <ul className="grid gap-5 sm:grid-cols-2">
        {comoTrabalho.map((item) => {
          const Icone = ICONES[item.icone] ?? GitBranch;

          return (
            <li
              key={item.titulo}
              className="group rounded-[var(--radius-card)] border border-line bg-surface p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-line-strong hover:bg-surface-hover"
            >
              {/* Chip 44px com SVG stroke — nunca emoji (padrão visual do brief) */}
              <span
                aria-hidden="true"
                className="mb-5 flex size-11 items-center justify-center rounded-[var(--radius-chip)] border border-accent/20 bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent/16"
              >
                <Icone className="size-5" strokeWidth={1.75} />
              </span>

              <h3 className="text-lg font-semibold">{item.titulo}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-ink-muted">
                {item.descricao}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-titulo"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <TituloSecao
        id="stack-titulo"
        sobretitulo="Ferramenta"
        titulo="Stack"
        descricao="Ferramenta é consequência da decisão, não o argumento. Fica no fim de propósito."
      />

      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {stack.map((grupo) => (
          <div key={grupo.titulo}>
            <dt className="text-sm font-medium uppercase tracking-wide text-ink-faint">
              {grupo.titulo}
            </dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {grupo.itens.map((item) => (
                <span
                  key={item}
                  className="rounded-[var(--radius-pill)] border border-line bg-surface px-3 py-1.5 text-sm text-ink-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Trajetoria() {
  return (
    <section
      id="trajetoria"
      aria-labelledby="trajetoria-titulo"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <TituloSecao
        id="trajetoria-titulo"
        sobretitulo="Percurso"
        titulo="Trajetória"
        descricao="Design desde 2014, código desde 2020. A base de UX é o que sustenta como eu decido interface."
      />

      <ol className="relative border-l border-line pl-8">
        {trajetoria.map((item) => (
          <li key={`${item.empresa}-${item.periodo}`} className="group pb-10 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] mt-2 size-2.5 rounded-full border-2 border-base transition-transform duration-300 group-hover:scale-125 ${
                item.atual ? "bg-accent" : "bg-line-strong"
              }`}
            />

            <p className="flex flex-wrap items-center gap-2 font-mono text-sm text-ink-faint">
              {item.periodo}
              {item.atual && (
                <span className="rounded-[var(--radius-pill)] bg-accent/12 px-2 py-0.5 text-xs font-medium text-accent-soft">
                  atual
                </span>
              )}
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {item.empresa}
              <span className="font-normal text-ink-muted"> · {item.papel}</span>
            </h3>

            <p className="mt-1.5 text-pretty leading-relaxed text-ink-muted">
              {item.descricao}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Contato() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <div className="glow-accent overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-10 text-center sm:p-16">
        <h2
          id="contato-titulo"
          className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Aberta a posições Senior Frontend
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-ink-muted">
          Remoto. Se o seu time precisa de alguém que decide arquitetura de UI e
          defende o trade-off por escrito, vamos conversar.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`mailto:${perfil.email}`}
            className="inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-accent px-7 py-3.5 font-medium text-white transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_12px_30px_-12px_var(--color-accent)]"
          >
            {perfil.email}
          </a>

          <a
            href={perfil.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-line bg-base-raised px-7 py-3.5 font-medium transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-line-strong"
          >
            LinkedIn
            <ArrowUpRight
              className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-ink-faint sm:flex-row">
        <p>© {new Date().getFullYear()} Joane Alves Ribeiro</p>

        <nav aria-label="Links externos">
          <ul className="flex items-center gap-6">
            <li>
              <a
                href={perfil.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-ink"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={perfil.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${perfil.email}`}
                className="transition-colors duration-300 hover:text-ink"
              >
                E-mail
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
