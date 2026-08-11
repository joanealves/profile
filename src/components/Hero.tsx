import { ArrowRight } from "lucide-react";
import { perfil } from "@/content/perfil";

/**
 * Hero — server component. Nada aqui precisa de estado no cliente.
 * A animação de entrada é CSS puro, então não custa JS nem bloqueia o LCP.
 */
export function Hero() {
  return (
    <section className="bg-vignette relative overflow-hidden">
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-32 sm:pt-40 lg:pb-32">
        <div className="flex flex-col items-center text-center">
          <p className="animate-in fade-in slide-in-from-bottom-2 inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-line bg-surface/80 px-4 py-1.5 text-sm text-ink-muted backdrop-blur duration-700">
            <span
              className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--color-accent)]"
              aria-hidden="true"
            />
            {perfil.cargo} · {perfil.local}
          </p>

          <h1 className="mt-8 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Construo interfaces que
            <br className="hidden sm:block" />{" "}
            <span className="text-accent-soft">não quebram</span> quando a rede
            quebra.
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-ink-muted">
            {perfil.posicionamento}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#cases"
              className="group inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-accent px-7 py-3.5 font-medium text-white transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_12px_30px_-12px_var(--color-accent)]"
            >
              Ver as decisões técnicas
              <ArrowRight
                className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>

            <a
              href={`mailto:${perfil.email}`}
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] border border-line bg-surface px-7 py-3.5 font-medium text-ink transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-hover"
            >
              Falar comigo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
