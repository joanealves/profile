"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon
} from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import NeuralNetworkBackground from "../components/NeuralNetworkBackground"



// Variantes de animação reutilizáveis
const fadeInVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const ProjectCard = ({
  title,
  description,
  technologies
}: {
  title: string,
  description: string,
  technologies: string[]
}) => (
  <Card className="bg-gray-800 border-gray-700 transition-transform hover:scale-105">
    <CardHeader>
      <CardTitle className="text-xl text-white">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="bg-gray-700 text-xs px-2 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function Portfolio() {
  const contactLinks = [
    {
      href: process.env.NEXT_PUBLIC_GITHUB_PROFILE || "#",
      icon: <GitHubLogoIcon />,
      label: "GitHub"
    },
    {
      href: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE || "#",
      icon: <LinkedInLogoIcon />,
      label: "LinkedIn"
    },
    {
      href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
      icon: <EnvelopeClosedIcon />,
      label: "Email"
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      {/* Fundo animado de rede neural */}
      <NeuralNetworkBackground />

      <div className="relative z-10">
        
        <header
          className="p-6 flex justify-between items-center sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md"
          role="banner"
        >
          <h1 className="text-2xl font-bold">Joane Alves</h1>
          <nav aria-label="Navegação Principal">
            <ul className="flex gap-6">
              {[
                { label: "Sobre", href: "#about" },
                { label: "Projetos", href: "#projects" },
                { label: "Skills", href: "#skills" },
                { label: "Contato", href: "#contact" }
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="hover:text-gray-400 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Seção Hero com Animação */}
        <motion.section
          className="relative flex flex-col items-center justify-center text-center h-[calc(100vh-4rem)] px-4 z-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
              }
            }
          }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold relative z-30"
            variants={fadeInVariants}
          >
            Desenvolvedora Full Stack
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-300 max-w-xl relative z-30"
            variants={fadeInVariants}
          >
            Especialista em Front-end, React e UX/UI Design, transformando ideias em experiências digitais incríveis.
          </motion.p>
          <motion.div variants={fadeInVariants} className="relative z-30">
            <Button
              className="mt-6 hover:bg-gray-700 transition-colors"
              aria-label="Ver Projetos"
            >
              Ver Projetos
            </Button>
          </motion.div>
        </motion.section>

        {/* Seção Sobre */}
        <section
          id="about"
          className="p-12 text-center container mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Sobre Mim</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Desenvolvedora Full Stack com paixão por criar interfaces intuitivas e eficientes.
            Combino expertise técnica em React, TypeScript, Django e FastAPI com um olhar atento ao design UX/UI.
          </p>
        </section>

        {/* Seção de Projetos com Grid Responsiva */}
        <section
          id="projects"
          className="p-12 bg-gray-800"
        >
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProjectCard
                title="Sistema ERP"
                description="Plataforma integrada de gestão empresarial"
                technologies={["React", "Django", "TypeScript"]}
              />
              <ProjectCard
                title="Mapas Interativos"
                description="Aplicação de visualização geoespacial"
                technologies={["React", "Google Maps API", "TypeScript"]}
              />
              <ProjectCard
                title="Plataforma CRM"
                description="Sistema de gerenciamento de relacionamento com clientes"
                technologies={["Next.js", "Shadcn UI", "Tailwind"]}
              />
            </div>
          </div>
        </section>

        {/* Seção de Skills */}
        <section
          id="skills"
          className="p-12 text-center container mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React", "TypeScript", "Next.js",
              "Django", "FastAPI", "Tailwind",
              "UX/UI Design", "Framer Motion"
            ].map((skill) => (
              <span
                key={skill}
                className="bg-gray-700 px-4 py-2 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Seção de Contato */}
        <section
          id="contact"
          className="p-12 bg-gray-800 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Contato</h2>
          <p className="text-gray-400 mb-6">
            Vamos construir algo incrível juntos!
          </p>
          <div className="flex justify-center gap-6">
            {contactLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={`Link para ${label}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-gray-400 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </section>

        {/* Rodapé */}
        <footer className="p-6 text-center text-gray-400 bg-gray-950">
          <p>© {new Date().getFullYear()} Joane Alves - Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}