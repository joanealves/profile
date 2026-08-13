"use client";

import React, { useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import {
  Accessibility,
  Contrast,
  Minus,
  Plus,
  RotateCcw,
  X,
  ZapOff,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Barra de acessibilidade — fonte, contraste e animação.             */
/*  Preferências persistem em localStorage e aplicam no <html>,        */
/*  para valer em qualquer página do site.                             */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "a11y-prefs";
const FONTE_MIN = 100;
const FONTE_MAX = 130;
const FONTE_PASSO = 10;

type Prefs = {
  fontScale: number;
  contrast: boolean;
  reduceMotion: boolean;
};

const PADRAO: Prefs = { fontScale: 100, contrast: false, reduceMotion: false };

function Toggle({
  ativo,
  onClick,
  icone,
  titulo,
  desc,
}: {
  ativo: boolean;
  onClick: () => void;
  icone: React.ReactNode;
  titulo: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
        ativo
          ? "border-[var(--blue-500)]/60 bg-[var(--blue-500)]/15"
          : "border-[var(--border)] bg-white/[0.03] hover:bg-white/[0.06]"
      }`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${
          ativo
            ? "border-[var(--blue-500)]/60 text-[var(--blue-300)]"
            : "border-[var(--border-strong)] text-[var(--fg-muted)]"
        }`}
        aria-hidden="true"
      >
        {icone}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-white">{titulo}</span>
        <span className="block text-xs leading-snug text-[var(--fg-muted)]">
          {desc}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={`ml-auto h-5 w-9 shrink-0 rounded-full border p-0.5 transition-colors ${
          ativo
            ? "border-[var(--blue-500)] bg-[var(--blue-600)]"
            : "border-[var(--border-strong)] bg-white/5"
        }`}
      >
        <span
          className={`block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
            ativo ? "translate-x-4" : ""
          }`}
        />
      </span>
    </button>
  );
}

export default function A11yProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prefs, setPrefs] = useState<Prefs>(PADRAO);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);

  // Carrega preferências salvas
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) setPrefs({ ...PADRAO, ...JSON.parse(salvo) });
    } catch {
      // preferências corrompidas: segue o padrão
    }
  }, []);

  // Aplica no <html> e persiste
  useEffect(() => {
    const html = document.documentElement;
    html.style.fontSize =
      prefs.fontScale === 100 ? "" : `${prefs.fontScale}%`;
    html.classList.toggle("a11y-contrast", prefs.contrast);
    html.classList.toggle("a11y-reduce-motion", prefs.reduceMotion);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // sem storage disponível: preferências valem só nesta visita
    }
  }, [prefs]);

  // Fecha com Escape (devolvendo o foco ao botão) ou clique fora
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        botaoRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const mudaFonte = (delta: number) =>
    setPrefs((p) => ({
      ...p,
      fontScale: Math.min(
        FONTE_MAX,
        Math.max(FONTE_MIN, p.fontScale + delta)
      ),
    }));

  return (
    <MotionConfig reducedMotion={prefs.reduceMotion ? "always" : "user"}>
      {children}

      <div ref={rootRef} className="fixed bottom-5 right-5 z-[70]">
        {open && (
          <div
            role="dialog"
            aria-label="Opções de acessibilidade"
            className="absolute bottom-16 right-0 w-[19rem] rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)]/95 p-4 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Acessibilidade</p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  botaoRef.current?.focus();
                }}
                aria-label="Fechar opções de acessibilidade"
                className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] text-[var(--fg-muted)] transition-colors hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Tamanho do texto */}
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-white/[0.03] p-3">
              <span className="min-w-0">
                <span className="block text-sm font-medium text-white">
                  Tamanho do texto
                </span>
                <span className="block text-xs text-[var(--fg-muted)]">
                  {prefs.fontScale}%
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => mudaFonte(-FONTE_PASSO)}
                  disabled={prefs.fontScale <= FONTE_MIN}
                  aria-label="Diminuir tamanho do texto"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border-strong)] text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => mudaFonte(FONTE_PASSO)}
                  disabled={prefs.fontScale >= FONTE_MAX}
                  aria-label="Aumentar tamanho do texto"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--border-strong)] text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </span>
            </div>

            <div className="mt-3 space-y-3">
              <Toggle
                ativo={prefs.contrast}
                onClick={() =>
                  setPrefs((p) => ({ ...p, contrast: !p.contrast }))
                }
                icone={<Contrast className="h-4 w-4" />}
                titulo="Alto contraste"
                desc="Fundo mais escuro e textos mais claros."
              />
              <Toggle
                ativo={prefs.reduceMotion}
                onClick={() =>
                  setPrefs((p) => ({ ...p, reduceMotion: !p.reduceMotion }))
                }
                icone={<ZapOff className="h-4 w-4" />}
                titulo="Reduzir animações"
                desc="Desliga transições e efeitos de movimento."
              />
            </div>

            <button
              type="button"
              onClick={() => setPrefs(PADRAO)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Restaurar padrão
            </button>
          </div>
        )}

        <button
          ref={botaoRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Opções de acessibilidade"
          className="btn-glow grid h-12 w-12 place-items-center rounded-full border border-[var(--blue-500)]/50 bg-[var(--blue-600)] text-white transition-colors hover:bg-[var(--blue-500)]"
        >
          <Accessibility className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </MotionConfig>
  );
}
