import { perfil } from "@/content/perfil";

/**
 * Hero — server component, animação em CSS puro.
 * Tom: apresentação, não pitch. Sem CTA de contratação.
 */
export function Hero() {
  return (
    <section className="bg-vignette relative overflow-hidden">
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-36 sm:pt-44">
        <p className="text-sm text-ink-faint">
          {perfil.cargo} · {perfil.local}
        </p>

        <h1 className="mt-5 text-balance text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          {perfil.nome}
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
          {perfil.intro}
        </p>

        <p className="mt-10 text-sm text-ink-faint">
          <a
            href="#projetos"
            className="underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent"
          >
            Os projetos estão logo abaixo
          </a>
        </p>
      </div>
    </section>
  );
}
