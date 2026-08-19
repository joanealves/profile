import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { perfil, sobre, stack } from "@/content/perfil";
import A11yProvider from "@/components/A11yProvider";

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
  "@graph": [
    {
      "@type": "Person",
      "@id": `${perfil.site}/#pessoa`,
      name: perfil.nome,
      url: perfil.site,
      jobTitle: perfil.cargo,
      description: sobre.paragrafos[0],
      email: `mailto:${perfil.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Belo Horizonte",
        addressRegion: "MG",
        addressCountry: "BR",
      },
      sameAs: [perfil.github, perfil.linkedin],
      knowsAbout: stack.flatMap((g) => g.itens),
    },
    {
      "@type": "WebSite",
      "@id": `${perfil.site}/#site`,
      url: perfil.site,
      name: perfil.nome,
      description: DESCRICAO,
      inLanguage: "pt-BR",
      author: { "@id": `${perfil.site}/#pessoa` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${mono.variable}`}>
        <A11yProvider>{children}</A11yProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
