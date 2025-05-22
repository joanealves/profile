import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://profile-woad-nine.vercel.app"),
  title: "Joane Alves | Desenvolvimento Web e UX/UI",
  description: "Desenvolvedora Full Stack com experiência em UX/UI, React, NestJS TypeScript, Api, Banco de Dados, Python.",
  keywords: ["Desenvolvimento Web", "UX/UI", "React", "Frontend", "NestJS", "Full Stack", "JavaScript"],
  authors: [{ name: "Joane Alves", url: "https://profile-woad-nine.vercel.app/" }],
  robots: "index, follow",
  openGraph: {
    title: "Joane Alves | Desenvolvimento Web e UX/UI",
    description: "Especialista em desenvolvimento web moderno e experiência do usuário.",
    url: "https://profile-woad-nine.vercel.app/",
    type: "website",
    images: [
      {
        url: "/capa.jpg",
        width: 1200,
        height: 630,
        alt: "Joane Alves UX/UI e Desenvolvimento Web"
      }
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/favicon_b.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Joane Alves",
              "url": "https://profile-woad-nine.vercel.app/",
              "sameAs": [
                "https://github.com/joanealves",
                "https://www.linkedin.com/in/joane-alves-ribeiro/",
              ],
              "jobTitle": "Desenvolvedora Full Stack | UXUI Design",
              "worksFor": { "@type": "Organization", "name": "Schema Desenvolvimento" },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
