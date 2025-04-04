"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
  ChatBubbleIcon,
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import Image from "next/image";


import EnhancedSkillsSection from "../components/EnhancedSkillsSection";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
import Footer from "../components/Footer";

// Variantes de animação aprimoradas
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1.0],
      delay: custom * 0.1
    }
  })
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardHoverVariants = {
  rest: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
  hover: {
    scale: 1.03,
    boxShadow: "0px 10px 15px rgba(0,0,0,0.1)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  index: number;
}

const ProjectCard = ({
  title,
  description,
  technologies,
  index
}: ProjectCardProps) => {
  const delay = index * 0.1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      whileHover="hover"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1.0],
            delay: delay
          }
        },
        hover: {
          scale: 1.03,
          boxShadow: "0px 10px 15px rgba(0,0,0,0.1)",
          transition: { duration: 0.3, ease: "easeOut" }
        },
        rest: {
          scale: 1,
          boxShadow: "0px 0px 0px rgba(0,0,0,0)"
        }
      }}
    >
      <Card className="bg-gray-800 border-gray-700 h-full">
        <CardHeader>
          <CardTitle className="text-xl text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <motion.span
                key={tech}
                className="bg-gray-700 text-xs px-2 py-1 rounded-full"
                whileHover={{ backgroundColor: "#4A5568", scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useEffect(() => {
    // Set loaded state after component mounts to enable animations
    setIsLoaded(true);

    // Previne o scroll quando o menu está aberto
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Fecha o menu mobile quando um item é clicado
  const handleNavItemClick = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "Sistema ERP",
      description: "Plataforma integrada de gestão empresarial",
      technologies: ["React", "Django", "TypeScript"]
    },
    {
      title: "Mapas Interativos",
      description: "Aplicação de visualização geoespacial",
      technologies: ["React", "Google Maps API", "TypeScript"]
    },
    {
      title: "Plataforma CRM",
      description: "Sistema de gerenciamento de relacionamento com clientes",
      technologies: ["Next.js", "Shadcn UI", "Tailwind"]
    }
  ];

  const skills = [
    "JavaScript", "React", "TypeScript", "Next.js",
    "Tailwind", "Vite", "UX/UI Design", "Figma", "Framer Motion", "Python", "Django", "FastAPI", "Node", "PHP", "Banco de Dados", "Sql", "Postgres", "Api", "Git"
  ];

  const contactLinks = [
    {
      href: process.env.NEXT_PUBLIC_GITHUB_PROFILE || "https://github.com/joanealves",
      icon: <GitHubLogoIcon />,
      label: "GitHub"
    },
    {
      href: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE || "https://www.linkedin.com/in/joane-alves-ribeiro/",
      icon: <LinkedInLogoIcon />,
      label: "LinkedIn"
    },
    {
      href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
      icon: <EnvelopeClosedIcon />,
      label: "Email"
    },
    {
      href: "https://wa.me/5531985201743",
      icon: <ChatBubbleIcon />,
      label: "WhatsApp"
    }
  ];

  const navItems = [
    { label: "Sobre", href: "#about" },
    { label: "Projetos", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contato", href: "#contact" },
    { label: "UX/UI", href: "/uxui" }
  ];

  // Variantes para animação do menu mobile
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileNavItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative">
      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      <div className="relative z-10">
        {/* Header with scroll-based opacity */}
        <motion.header
          className="p-6 flex justify-between items-center sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md"
          style={{ opacity: headerOpacity }}
          role="banner"
        >
          <div className="flex items-center">
            <Image
              src="/Logo.png"
              alt="Logo Joane Alves"
              width={40}
              height={40}
              className="mr-2"
            />
            <h1 className="text-2xl font-bold">Joane Alves</h1>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:block" aria-label="Navegação Principal">
            <ul className="flex gap-6">
              {navItems.map(({ label, href }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    className="hover:text-gray-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <Cross1Icon width={24} height={24} /> : <HamburgerMenuIcon width={24} height={24} />}
          </button>
        </motion.header>

        {/* Menu Mobile - Overlay com blur e cor*/}
        <motion.div
          className={`fixed inset-0 bg-black/70 backdrop-blur-md md:hidden z-40 ${isMenuOpen ? "block" : "hidden"}`}
          onClick={() => setIsMenuOpen(false)}
          animate={isMenuOpen ? "open" : "closed"}
          initial="closed"
          variants={{
            open: { opacity: 1 },
            closed: { opacity: 0, display: "none" }
          }}
        />

        {/* Menu Mobile - Sidebar com fundo escuro e opaco */}
        <motion.nav
          className={`fixed top-0 right-0 bottom-0 w-64 bg-gray-900 shadow-xl border-l border-gray-800 z-50 md:hidden p-6 pt-20 ${isMenuOpen ? "block" : "hidden"}`}
          animate={isMenuOpen ? "open" : "closed"}
          initial="closed"
          variants={mobileMenuVariants}
          aria-hidden={!isMenuOpen}
        >
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <Cross1Icon width={24} height={24} />
          </button>

          <ul className="flex flex-col gap-6">
            {navItems.map(({ label, href }) => (
              <motion.li key={label} variants={mobileNavItemVariants}>
                <a
                  href={href}
                  className="text-xl font-medium text-white hover:text-purple-400 transition-colors block py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavItemClick(href.substring(1));
                  }}
                >
                  {label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Hero Section with Staggered Animation */}
        <motion.section
          className="relative flex flex-col items-center justify-center text-center h-[calc(100vh-4rem)] px-4 z-20"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={staggerContainerVariants}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold relative z-30"
            variants={fadeInUpVariants}
            custom={0}
          >
            Desenvolvedora Full Stack
          </motion.h2>
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl relative z-30"
            variants={fadeInUpVariants}
            custom={1}
          >
            Especialista em Front-end, React e UX/UI Design, transformando ideias em experiências digitais incríveis.
          </motion.p>
          <motion.div
            variants={fadeInUpVariants}
            custom={2}
            className="relative z-30"
          >
            <Button
              className="mt-8 px-6 py-6 text-lg bg-purple-600 hover:bg-purple-700 transition-colors"
              aria-label="Ver Projetos"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Projetos
            </Button>
          </motion.div>
        </motion.section>

        {/* About Section */}
        {/* About Section */}
        <motion.section
          id="about"
          className="p-12 text-center container mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-3/4 lg:w-4/5">
              <motion.h2
                className="text-3xl font-bold mb-6"
                variants={fadeInUpVariants}
                custom={0}
              >
                Sobre Mim
              </motion.h2>
              <motion.p
                className="text-gray-400 max-w-2xl mx-auto text-lg"
                variants={fadeInUpVariants}
                custom={1}
              >
                Meu caminho na tecnologia começou pelo design. Trabalhei em agências, criando visuais e identidades para marcas. Foi nesse universo que conheci o UX/UI e me apaixonei por entender como as pessoas interagem com interfaces digitais. Durante a pandemia, me aprofundei ainda mais, fiz cursos, bootcamps e comecei a programar para dar vida às minhas ideias. Hoje, como desenvolvedora Full Stack, combino design e código para criar produtos intuitivos, acessíveis e funcionais.
              </motion.p>
            </div>

            <motion.div
              className="md:w-1/4 lg:w-1/5 flex justify-center"
              variants={fadeInUpVariants}
              custom={2}
            >
              <div className="overflow-hidden rounded-full w-32 h-32 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                <img
                  src="/perfil.jpg"
                  alt="Minha foto"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.section>
        {/* Project Section with View Animations */}
        <section
          id="projects"
          className="p-12 bg-gray-800"
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-3xl font-bold mb-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Projetos
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

       <EnhancedSkillsSection />

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="p-12 bg-gray-800 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-4"
            variants={fadeInUpVariants}
            custom={0}
          >
            Contato
          </motion.h2>
          <motion.p
            className="text-gray-400 mb-8"
            variants={fadeInUpVariants}
            custom={1}
          >
            Vamos construir algo incrível juntos!
          </motion.p>
          <motion.div
            className="flex justify-center gap-8"
            variants={fadeInUpVariants}
            custom={2}
          >
            {contactLinks.map(({ href, icon, label }, index) => (
              <motion.a
                key={label}
                href={href}
                aria-label={`Link para ${label}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.section>
<Footer />
      </div>
    </div>
  );
}