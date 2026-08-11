import { CaseCard } from "@/components/CaseCard";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import {
  ComoTrabalho,
  Contato,
  Footer,
  Stack,
  Trajetoria,
} from "@/components/Sections";
import { cases } from "@/content/cases";

/**
 * Server component. Só o Header roda no cliente — o resto é HTML estático,
 * o que mantém o JS de primeira carga baixo e o conteúdo indexável.
 */
export default function Home() {
  return (
    <>
      {/* Skip link: primeiro nó focável da página (a11y) */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-[var(--radius-chip)] focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <div id="topo">
          <Hero />
        </div>

        <section
          id="cases"
          aria-labelledby="cases-titulo"
          className="mx-auto max-w-6xl px-6 py-24"
        >
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              Decisões
            </p>
            <h2
              id="cases-titulo"
              className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Três decisões técnicas, com o trade-off
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
              Não é lista de tecnologia. É o problema, a escolha, o que eu abri
              mão em troca e o que mudou depois.
            </p>
          </div>

          <div className="space-y-6">
            {cases.map((caso) => (
              <CaseCard key={caso.slug} caso={caso} />
            ))}
          </div>
        </section>

        <ComoTrabalho />
        <Trajetoria />
        <Stack />
        <Contato />
      </main>

      <Footer />
    </>
  );
}
