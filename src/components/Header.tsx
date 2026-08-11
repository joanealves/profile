"use client";

import { useEffect, useState } from "react";
import { perfil } from "@/content/perfil";

const NAV = [
  { href: "#cases", rotulo: "Cases" },
  { href: "#como-trabalho", rotulo: "Como trabalho" },
  { href: "#stack", rotulo: "Stack" },
  { href: "#trajetoria", rotulo: "Trajetória" },
];

/**
 * Único componente com estado do site — a borda só aparece após rolar.
 * Sem menu mobile em overlay: com 4 itens, esconder atrás de um hambúrguer
 * custa mais (foco, aria-expanded, trap de teclado) do que resolve.
 */
export function Header() {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-[var(--ease-out-soft)] ${
        rolou
          ? "border-b border-line bg-base/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#topo"
          className="font-semibold tracking-tight transition-colors duration-300 hover:text-accent-soft"
        >
          Joane Alves
        </a>

        <nav aria-label="Seções do site" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-[var(--radius-chip)] px-3 py-2 text-sm text-ink-muted transition-colors duration-300 hover:bg-surface hover:text-ink"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={`mailto:${perfil.email}`}
          className="rounded-[var(--radius-pill)] border border-line bg-surface px-4 py-2 text-sm font-medium transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-hover"
        >
          Contato
        </a>
      </div>
    </header>
  );
}
