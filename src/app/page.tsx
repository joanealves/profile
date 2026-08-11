import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjetoCard } from "@/components/ProjetoCard";
import { Contato, Footer, Stack, Trajetoria } from "@/components/Sections";
import { projetosDestaque, projetosGrade } from "@/content/projetos";

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
          id="projetos"
          aria-labelledby="projetos-titulo"
          className="mx-auto max-w-5xl px-6 py-24"
        >
          <h2 id="projetos-titulo" className="sr-only">
            Projetos
          </h2>

          <div className="space-y-6">
            {projetosDestaque.map((projeto) => (
              <ProjetoCard key={projeto.slug} projeto={projeto} />
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {projetosGrade.map((projeto) => (
              <ProjetoCard key={projeto.slug} projeto={projeto} />
            ))}
          </div>
        </section>

        <Trajetoria />
        <Stack />
        <Contato />
      </main>

      <Footer />
    </>
  );
}
