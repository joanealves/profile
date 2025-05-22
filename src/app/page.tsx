"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
  ChatBubbleIcon,
  ArrowRightIcon,
  ExternalLinkIcon
} from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";

import Image from "next/image";
import WhatsAppButton from "@/components/WhatsAppButton";

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection"
import ModernSkillsSection from "../components/ModernSkillsSection";
import Footer from "../components/Footer";
import UXShowcaseSection from "../components/UXShowcaseSection";

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

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
}

interface ContactLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      className="h-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0], delay: index * 0.1 }
        }
      }}
    >
      <Card className="bg-gray-800 border-gray-700 overflow-hidden h-full flex flex-col group">
        <div className="relative w-full h-48 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
              <span className="text-4xl font-bold opacity-30">{project.title.charAt(0)}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
        </div>

        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center">
            {project.title}
            <motion.div
              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              <ArrowRightIcon className="h-4 w-4" />
            </motion.div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-gray-400 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <motion.span
                key={tech}
                className="bg-gray-700 text-xs px-2 py-1 rounded-full text-gray-300"
                whileHover={{ backgroundColor: "#4A5568", scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-4 group-hover:mt-0">
          <div className="flex gap-3">
            {project.githubUrl && (
              <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-gray-600">
                <GitHubLogoIcon className="mr-2 h-4 w-4" />
                Código
              </Button>
            )}
            {project.liveUrl && (
              <Button size="sm" variant="outline" className="bg-purple-800 hover:bg-purple-700">
                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                Demo
              </Button>
            )}
          </div>
        </CardFooter>
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
    setIsLoaded(true);

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);


  const projects: Project[] = [
    {
      title: "Plataforma CRM",
      description: "Solução completa de gestão de relacionamento com clientes que automatiza processos, centraliza informações e aumenta a eficiência das suas equipes de vendas e marketing. Ele está em desenvolvimento e está aqui como demo.",
      technologies: ["Em desenvolvimento ", "Next.js", "Shadcn UI", "Tailwind", ],
      image: "/crm2.gif",
      githubUrl: "https://",
      liveUrl: "https://crm-marketing-two.vercel.app/",
    },
    {
      title: "Website - ForceFlow",
      description: "Desenvolvimento Frontend, em Next.js, do site ForceFlow. Utilizando as melhores tecnologias.",
      technologies: ["Next.js", "Tailwind", "Frontend"],
      image: "/force.gif",
      githubUrl: "https://github.com/joanealves/forceflow",
      liveUrl: "https://forceflow.vercel.app/",
    },
     
    {
      title: "Website | Portifólio de UX/UI Designer",
      description: "Desenvolvido em Next.js, pensado para além de demostrar conhecimento em UX/UI, criar um ambiente de aprendizagem divertida para o usuário",
      technologies: ["Next.js", "Shadcn UI", "Tailwind", "Figma",],
      image: "/ux_portifolio.gif", 
      githubUrl: "https://github.com/joanealves/erp_salao",
      liveUrl: "https://ux-portifolio.vercel.app/"
    },
    {
      title: "EyeCareAi | Inteligência Artificial aplicada ao bem-estar digital",
      description: "O EyeCareAI é um sistema avançado de monitoramento de saúde ocular que utiliza inteligência artificial e visão computacional para detectar e prevenir fadiga visual, problemas posturais e hábitos prejudiciais durante o uso de computadores. Desenvolvido para promover bem-estar, o sistema monitora em tempo real diversos indicadores de saúde ocular e ergonomia.",
      technologies: ["Em desenvolvimento","Python", "Opencv", "Mediapipe", "Pillow", "Ai"],
      image: "/eye.png", 
      githubUrl: "https://gamma.app/docs/EyeCareAI-Monitoramento-Inteligente-da-Saude-Ocular-6ha4mz8jhs1vkfn",
      liveUrl: "/eyerai.gif"
    },
    {
      title: "Mapas Interativos",
      description: "Aplicação de visualização geoespacial para monitoramento de terremotos em tempo real. Aplicação em desenvolvimento",
      technologies: ["React", "Mapbox", "OpenMap", "D3.js"],
      image: "/geo.gif",
      githubUrl: "https://github.com/joanealves/geoview",
      liveUrl: "https://geoview-pj9a.vercel.app/"
    },
    {
      title: "Ai - Analyst",
      description: "AI Analyst é uma aplicação que analisa arquivos PDF usando inteligência artificial. Ela extrai o texto dos documentos, identifica palavras-chave, sentimentos e padrões relevantes, oferecendo insights rápidos e automatizados a partir do conteúdo analisado.",
      technologies: ["Python", "Openai", "Metplotlib", "Langchain", "streamlit"],
      image: "/capa-ia.png",
      githubUrl: "https://github.com/joanealves/ia-analyst",
      liveUrl: ""
    },
   
  ];


  const contactLinks: ContactLink[] = [
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
      href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || "joane.desenvolvimentoweb@gmail.com"}`,
      icon: <EnvelopeClosedIcon className="w-5 h-5" />,
      label: "Email"
    },
    {
      href: "https://wa.me/5531985201743",
      icon: <ChatBubbleIcon />,
      label: "WhatsApp"
    }
  ];

  const mobileNavItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen relative">

      <div className="relative z-10">
        <Header />
        <HeroSection />
        <AboutSection />
        <ProjectsSection projects={projects} />
        <ModernSkillsSection />
        <UXShowcaseSection />

       <motion.section
        id="contact"
        className="relative py-12 md:py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainerVariants}
      >
  <div className="absolute inset-0">
    <div className="absolute top-10 left-5 w-32 h-32 md:w-48 md:h-48 bg-slate-500/5 rounded-full blur-2xl"></div>
    <div className="absolute bottom-10 right-5 w-40 h-40 md:w-56 md:h-56 bg-gray-500/5 rounded-full blur-2xl"></div>
  </div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-8 md:mb-12">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-slate-400 bg-clip-text text-transparent"
        variants={fadeInUpVariants}
        custom={0}
      >
        Vamos Conversar?
      </motion.h2>
      <motion.p
        className="text-base md:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed"
        variants={fadeInUpVariants}
        custom={1}
      >
        Sempre aberta para novos projetos e oportunidades criativas.
      </motion.p>
    </div>

    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
        
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-700/50"
          variants={fadeInUpVariants}
          custom={2}
        >
          <h3 className="text-lg md:text-xl font-bold mb-4 text-white">Entre em Contato</h3>
          <div className="space-y-3">
            <motion.a
              href="mailto:joane.desenvolvimentoweb@gmail.com"
              aria-label="Link email"
              className="flex items-center space-x-3 group cursor-pointer p-2 rounded-lg hover:bg-gray-700/30 transition-all"
              whileHover={{ x: 3 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                <EnvelopeClosedIcon className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm text-white font-medium truncate">joane.desenvolvimentoweb@gmail.com</p>
              </div>
            </motion.a>

            <motion.a
              href="https://wa.me/5531985201743"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Botão de whatsapp"
              className="flex items-center space-x-3 group cursor-pointer p-2 rounded-lg hover:bg-gray-700/30 transition-all"
              whileHover={{ x: 3 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <ChatBubbleIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">WhatsApp</p>
                <p className="text-sm text-white font-medium">+55 (31) 98520-1743</p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl p-4 md:p-6 text-center relative overflow-hidden"
          variants={fadeInUpVariants}
          custom={3}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-transparent"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <ChatBubbleIcon className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
              Pronta para começar?
            </h3>
            <p className="text-slate-100 text-sm mb-4 leading-relaxed">
              Disponível para novos projetos. Vamos transformar sua ideia em realidade!
            </p>
            
            <motion.a
              href="https://wa.me/5531985201743"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link Para conversar no whatsapp"
              className="inline-flex items-center justify-center w-full bg-white text-slate-600 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-100 transition-all text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChatBubbleIcon className="mr-2 w-4 h-4" />
              Conversar no WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        variants={fadeInUpVariants}
        custom={4}
      >
        <motion.a
          href="https://github.com/joanealves"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Gihub Joane"
          className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-3 border border-gray-700/30 group text-center hover:border-slate-500/50 transition-all"
          whileHover={{ y: -2 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center mx-auto mb-2">
            <GitHubLogoIcon className="w-4 h-4 text-white" />
          </div>
          <p className="text-sm text-white font-medium">GitHub</p>
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/joane-alves-ribeiro/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Linkedin Joane"
          className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-3 border border-gray-700/30 group text-center hover:border-blue-500/50 transition-all"
          whileHover={{ y: -2 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto mb-2">
            <LinkedInLogoIcon className="w-4 h-4 text-white" />
          </div>
          <p className="text-sm text-white font-medium">LinkedIn</p>
        </motion.a>

        <motion.div className="bg-gray-800/20 backdrop-blur-sm rounded-lg p-3 border border-gray-700/20 text-center">
          <div className="text-xl font-bold text-slate-400 mb-1">01h</div>
          <p className="text-xs text-gray-400">Resposta</p>
        </motion.div>

        <motion.div className="bg-gray-800/20 backdrop-blur-sm rounded-lg p-3 border border-gray-700/20 text-center">
          <div className="text-xl font-bold text-slate-400 mb-1">+3</div>
          <p className="text-xs text-gray-400">Anos exp.</p>
        </motion.div>
      </motion.div>
    </div>
  </div>
</motion.section>

        <WhatsAppButton />

        <Footer />
      </div>
    </div>
  );
}