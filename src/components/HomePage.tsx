"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BrainCircuit,
  Compass,
  DraftingCompass,
  Github,
  Hammer,
  Linkedin,
  Mail,
  Menu,
  PenTool,
  Radio,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  capacidades,
  faixaConfianca,
  hero,
  perfil,
  processo,
  sobre,
  stack,
  trajetoria,
} from "@/content/perfil";
import { projetos } from "@/content/projetos";

/* ------------------------------------------------------------------ */
/*  Motion primitives — reveals discretos, mesmo padrão do site Schema */
/* ------------------------------------------------------------------ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
  }),
};

function Reveal({
  children,
  i = 0,
  className,
}: {
  children: React.ReactNode;
  i?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      custom={i}
      variants={reduce ? undefined : fadeUp}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dados de navegação — ordem de leitura: quem sou → o que faço →     */
/*  como trabalho → projetos → trajetória → contato                    */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: "Quem sou", href: "#sobre" },
  { label: "O que faço", href: "#capacidades" },
  { label: "Como trabalho", href: "#processo" },
  { label: "Projetos", href: "#projetos" },
  { label: "Trajetória", href: "#trajetoria" },
];

const ICONES: Record<string, LucideIcon> = {
  Blocks,
  PenTool,
  Users,
  Radio,
  BrainCircuit,
  Accessibility,
  Compass,
  DraftingCompass,
  Hammer,
  TrendingUp,
};

function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal i={1}>
        <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal i={2}>
          <p className="mt-4 text-pretty text-base leading-relaxed text-[var(--fg-muted)]">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Página                                                             */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top" className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* Skip link (a11y) */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-lg focus:bg-[var(--blue-600)] focus:px-4 focus:py-2 focus:font-medium focus:text-white"
      >
        Pular para o conteúdo
      </a>

      {/* ---------------------------------------------------------- */}
      {/*  Navbar                                                     */}
      {/* ---------------------------------------------------------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] font-mono text-sm font-semibold text-[var(--blue-400)]">
              JA
            </span>
            <span className="text-lg font-semibold tracking-tight text-white">
              Joane Alves
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--fg-muted)] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#contato"
              className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Contato
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--border)] text-white md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-xl md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-[var(--fg-muted)] hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--blue-600)] px-4 py-2.5 text-sm font-medium text-white"
              >
                Contato <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="conteudo">
        {/* -------------------------------------------------------- */}
        {/*  Hero — quem eu sou, antes de qualquer projeto            */}
        {/* -------------------------------------------------------- */}
        <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
          <div className="pointer-events-none absolute inset-0 bg-grid mask-fade" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] aura" />

          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <Reveal>
              <span className="eyebrow">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--blue-400)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--blue-400)]" />
                </span>
                {perfil.eyebrow}
              </span>
            </Reveal>

            <Reveal i={1}>
              <h1 className="mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {hero.titulo[0]}
                <span className="text-gradient">{hero.titulo[1]}</span>
                {hero.titulo[2]}
              </h1>
            </Reveal>

            <Reveal i={2}>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--fg-muted)]">
                {hero.subtitulo}
              </p>
            </Reveal>

            <Reveal i={3}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#sobre"
                  className="btn-glow group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--blue-600)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--blue-500)] sm:w-auto"
                >
                  Me conheça melhor
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#projetos"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                >
                  Ver projetos
                </a>
              </div>
            </Reveal>

            {/* Janela de produto real — Agro IA */}
            <Reveal i={4}>
              <div className="relative mx-auto mt-20 max-w-4xl">
                <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 aura" />
                <div className="card relative overflow-hidden !border-[var(--border-strong)] p-2">
                  <div className="flex items-center gap-1.5 px-3 py-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]/70" />
                    <span className="h-3 w-3 rounded-full bg-[#febc2e]/70" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]/70" />
                    <span className="ml-3 font-mono text-xs text-[var(--fg-subtle)]">
                      {hero.janela.titulo}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      {hero.janela.badge}
                    </span>
                  </div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-[var(--border)]">
                    <Image
                      src={hero.janela.imagem}
                      alt={hero.janela.alt}
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 900px"
                      className="object-cover object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Faixa de confiança                                       */}
        {/* -------------------------------------------------------- */}
        <section className="border-y border-[var(--border)] bg-[var(--bg-elevated)]/40 py-8">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--fg-subtle)]">
              {faixaConfianca}
            </p>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Quem sou                                                 */}
        {/* -------------------------------------------------------- */}
        <section id="sobre" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-14 lg:grid-cols-2">
              <div>
                <Reveal>
                  <span className="eyebrow">Quem sou</span>
                </Reveal>
                <Reveal i={1}>
                  <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {sobre.titulo}
                  </h2>
                </Reveal>
                {sobre.paragrafos.map((p, i) => (
                  <Reveal key={i} i={2 + i}>
                    <p className="mt-5 text-pretty text-lg leading-relaxed text-[var(--fg-muted)]">
                      {p}
                    </p>
                  </Reveal>
                ))}
                <Reveal i={4}>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {sobre.pilares.map(([t, d]) => (
                      <div
                        key={t}
                        className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 p-4"
                      >
                        <div className="text-sm font-semibold text-white">{t}</div>
                        <div className="mt-1 text-sm text-[var(--fg-muted)]">{d}</div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal i={2}>
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-6 aura" />
                  <div className="card relative overflow-hidden p-1.5">
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-[var(--border)]">
                      <Image
                        src={sobre.foto.src}
                        alt={sobre.foto.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 500px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  O que faço                                               */}
        {/* -------------------------------------------------------- */}
        <section id="capacidades" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead
              eyebrow="O que faço"
              title="Da arquitetura à interface em produção"
              subtitle="Cubro o ciclo inteiro de um produto digital — da decisão de arquitetura ao design que o torna simples de usar."
            />

            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capacidades.map((c, i) => {
                const Icone = ICONES[c.icone] ?? Blocks;
                return (
                  <Reveal key={c.titulo} i={i % 3}>
                    <div className="card group h-full p-6">
                      <div className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--border-strong)] bg-[var(--blue-500)]/10 text-[var(--blue-300)] transition-colors group-hover:bg-[var(--blue-500)]/20">
                        <Icone className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-white">
                        {c.titulo}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                        {c.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Como trabalho                                            */}
        {/* -------------------------------------------------------- */}
        <section
          id="processo"
          className="relative border-y border-[var(--border)] bg-[var(--bg-elevated)]/40 py-28"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead
              eyebrow="Como trabalho"
              title="Descobrir → Projetar → Construir → Evoluir"
              subtitle="Processo de produto, não de tarefa: começo pelo problema e não paro no lançamento."
            />

            <div className="relative mt-16">
              {/* Linha conectora animada (desktop) */}
              <div className="pointer-events-none absolute left-0 right-0 top-[38px] hidden h-px lg:block">
                <div className="absolute inset-0 bg-[var(--border-strong)] opacity-40" />
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left"
                  style={{
                    right: 0,
                    background:
                      "linear-gradient(90deg, transparent, var(--blue-500) 30%, var(--blue-400) 70%, transparent)",
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {processo.map((p, i) => {
                  const Icone = ICONES[p.icone] ?? Compass;
                  return (
                    <Reveal key={p.titulo} i={i}>
                      <div className="group relative">
                        <motion.div
                          className="relative z-10 mx-auto grid h-[76px] w-[76px] place-items-center rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--blue-300)]"
                          initial={{ boxShadow: "0 0 0 0 rgba(37,99,235,0)" }}
                          whileInView={{
                            boxShadow: [
                              "0 0 0 0 rgba(37,99,235,0)",
                              "0 0 24px 2px rgba(37,99,235,0.45)",
                              "0 0 0 0 rgba(37,99,235,0)",
                            ],
                          }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.9, delay: 0.5 + i * 0.35 }}
                        >
                          <Icone className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                          <span className="absolute -right-1 -top-1 rounded-full border border-[var(--border-strong)] bg-[var(--bg)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--fg-subtle)]">
                            {p.passo}
                          </span>
                        </motion.div>
                        <div className="mt-5 text-center">
                          <h3 className="text-lg font-semibold text-white">
                            {p.titulo}
                          </h3>
                          <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-[var(--fg-muted)]">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Projetos — cards compactos, imagem no topo               */}
        {/* -------------------------------------------------------- */}
        <section id="projetos" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead
              eyebrow="Projetos"
              title="Produtos que eu construí e mantenho"
              subtitle="Dois SaaS próprios — onde eu decido arquitetura, UX e pricing — e as explorações que sustentam o resto."
            />

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projetos.map((p, i) => {
                const isGif = p.imagem?.endsWith(".gif");
                const externo = Boolean(p.link);
                const Wrapper = externo ? "a" : "article";
                return (
                  <Reveal key={p.slug} i={i % 3}>
                    <Wrapper
                      {...(externo
                        ? {
                            href: p.link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      className="card group flex h-full flex-col overflow-hidden"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border)]">
                        {p.imagem ? (
                          <Image
                            src={p.imagem}
                            alt={p.nome}
                            fill
                            unoptimized={isGif}
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="relative flex h-full w-full items-center justify-center bg-grid">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue-500)]/10 via-transparent to-transparent" />
                            <span className="relative font-mono text-sm uppercase tracking-[0.2em] text-[var(--fg-subtle)]">
                              {p.tipo}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-xs uppercase tracking-wider text-[var(--fg-subtle)]">
                            {p.tipo}
                          </span>
                          {p.destaque && (
                            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                              Produto próprio
                            </span>
                          )}
                        </div>
                        <h3 className="mt-3 flex items-center gap-1.5 text-xl font-semibold text-white">
                          {p.nome}
                          {externo && (
                            <ArrowUpRight className="h-4 w-4 text-[var(--fg-subtle)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--blue-300)]" />
                          )}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
                          {p.resumo}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[11px] text-[var(--fg-subtle)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Wrapper>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Trajetória                                               */}
        {/* -------------------------------------------------------- */}
        <section
          id="trajetoria"
          className="relative border-y border-[var(--border)] bg-[var(--bg-elevated)]/40 py-28"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead
              eyebrow="Trajetória"
              title="Do design de 2014 à liderança de produto"
              subtitle="Cada etapa somou uma camada: design, código, backend, UX de produto — e agora a condução de time."
            />

            <div className="mx-auto mt-16 max-w-3xl">
              <ol className="relative border-l border-[var(--border-strong)]/60 pl-8">
                {trajetoria.map((item, i) => (
                  <Reveal key={`${item.empresa}-${item.periodo}`} i={i % 3}>
                    <li className="group relative pb-12 last:pb-0">
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[38.5px] top-1.5 grid h-5 w-5 place-items-center rounded-full border-2 border-[var(--bg)] transition-transform duration-300 group-hover:scale-110 ${
                          item.atual
                            ? "bg-[var(--blue-500)] shadow-[0_0_16px_2px_rgba(37,99,235,0.5)]"
                            : "bg-[var(--border-strong)]"
                        }`}
                      />

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-sm text-[var(--fg-subtle)]">
                          {item.periodo}
                        </span>
                        {item.atual && (
                          <span className="rounded-full border border-[var(--blue-500)]/30 bg-[var(--blue-500)]/10 px-2.5 py-0.5 text-[11px] font-medium text-[var(--blue-300)]">
                            atual
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 text-lg font-semibold text-white">
                        {item.empresa}
                        <span className="font-normal text-[var(--fg-muted)]">
                          {" "}
                          · {item.papel}
                        </span>
                      </h3>

                      <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--fg-muted)]">
                        {item.descricao}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Stack                                                    */}
        {/* -------------------------------------------------------- */}
        <section id="stack" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHead
              eyebrow="Tecnologias"
              title="Stack que eu uso em produção"
              subtitle="Ferramenta é consequência da decisão — esta é a caixa que eu conheço a fundo."
            />
            <Reveal i={1}>
              <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
                {stack.flatMap((g) => g.itens).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-2 font-mono text-sm text-[var(--fg-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* -------------------------------------------------------- */}
        {/*  Contato                                                  */}
        {/* -------------------------------------------------------- */}
        <section id="contato" className="relative overflow-hidden py-32">
          <div className="pointer-events-none absolute inset-0 bg-grid mask-fade opacity-70" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 aura" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Vamos construir algo{" "}
                <span className="text-gradient">juntos</span>?
              </h2>
            </Reveal>
            <Reveal i={1}>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-[var(--fg-muted)]">
                Estou sempre aberta a boas conversas sobre produto, frontend e
                arquitetura.
              </p>
            </Reveal>
            <Reveal i={2}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${perfil.email}`}
                  className="btn-glow group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--blue-600)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--blue-500)] sm:w-auto"
                >
                  <Mail className="h-4 w-4" />
                  {perfil.email}
                </a>
                <a
                  href={perfil.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={perfil.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---------------------------------------------------------- */}
      {/*  Footer                                                     */}
      {/* ---------------------------------------------------------- */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-[var(--fg-subtle)] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {perfil.nome} · {perfil.local}
          </p>
          <p className="font-mono text-xs">
            Next.js · TypeScript · Tailwind — código próprio, sem template
          </p>
        </div>
      </footer>
    </div>
  );
}
