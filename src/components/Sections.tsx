import { perfil, stack, trajetoria } from "@/content/perfil";

function TituloSecao({
  titulo,
  descricao,
  id,
}: {
  titulo: string;
  descricao?: string;
  id: string;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <h2
        id={id}
        className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
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

export function Trajetoria() {
  return (
    <section
      id="trajetoria"
      aria-labelledby="trajetoria-titulo"
      className="mx-auto max-w-5xl px-6 py-24"
    >
      <TituloSecao id="trajetoria-titulo" titulo="Trajetória" />

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

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-titulo"
      className="mx-auto max-w-5xl px-6 py-24"
    >
      <TituloSecao id="stack-titulo" titulo="Ferramentas" />

      <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
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

export function Contato() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="mx-auto max-w-5xl px-6 py-24"
    >
      <TituloSecao
        id="contato-titulo"
        titulo="Contato"
        descricao="Para falar sobre um projeto ou trocar ideia, é só chamar."
      />

      <ul className="flex flex-wrap gap-x-10 gap-y-4 text-lg">
        <li>
          <a
            href={`mailto:${perfil.email}`}
            className="underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-soft hover:decoration-accent"
          >
            {perfil.email}
          </a>
        </li>
        <li>
          <a
            href={perfil.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-soft hover:decoration-accent"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href={perfil.github}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-soft hover:decoration-accent"
          >
            GitHub
          </a>
        </li>
      </ul>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-ink-faint">
        <p>© {new Date().getFullYear()} {perfil.nome}</p>
      </div>
    </footer>
  );
}
