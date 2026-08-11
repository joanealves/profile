import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { perfil } from "@/content/perfil";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const DESCRICAO =
  "Portfolio de Joane Alves Ribeiro. Projetos em React, Next.js, TypeScript e Python, com foco em frontend e base em design.";

export const metadata: Metadata = {
  metadataBase: new URL(perfil.site),
  title: {
    default: `${perfil.nome} — ${perfil.cargo}`,
    template: `%s — ${perfil.nome}`,
  },
  description: DESCRICAO,
  authors: [{ name: perfil.nome, url: perfil.site }],
  creator: perfil.nome,
  robots: { index: true, follow: true },
  alternates: { canonical: perfil.site },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: perfil.site,
    siteName: perfil.nome,
    title: `${perfil.nome} — ${perfil.cargo}`,
    description: DESCRICAO,
  },
  twitter: {
    card: "summary_large_image",
    title: `${perfil.nome} — ${perfil.cargo}`,
    description: DESCRICAO,
  },
};

/** JSON-LD: dados batendo com o conteúdo real do site, sem empregador inventado. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: perfil.nome,
  url: perfil.site,
  jobTitle: perfil.cargo,
  email: `mailto:${perfil.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belo Horizonte",
    addressRegion: "MG",
    addressCountry: "BR",
  },
  sameAs: [perfil.github, perfil.linkedin],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Acessibilidade Web",
    "Python",
    "UX/UI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${mono.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
