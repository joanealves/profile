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

        <motion.section
          id="contact"
          className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainerVariants}
        >
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-slate-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.h2
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-slate-400 bg-clip-text text-transparent"
                variants={fadeInUpVariants}
                custom={0}
              >
                Vamos Conversar?
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                variants={fadeInUpVariants}
                custom={1}
              >
                Estou sempre aberta para discutir novos projetos, oportunidades criativas ou apenas para trocar uma ideia sobre tecnologia.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-8"
                variants={fadeInUpVariants}
                custom={2}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                  <h3 className="text-2xl font-bold mb-6 text-white">Entre em Contato</h3>
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-center space-x-4 group cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-slate-500/25 transition-all">
                        <EnvelopeClosedIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white font-medium">joane.desenvolvimentoweb@gmail.com</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center space-x-4 group cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all">
                        <ChatBubbleIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">WhatsApp</p>
                        <p className="text-white font-medium">+55 (31) 98520-1743</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href="https://github.com/joanealves"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 group text-center hover:border-slate-500/50 transition-all"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-all">
                      <GitHubLogoIcon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white font-medium">GitHub</p>
                    <p className="text-sm text-gray-400">Meus projetos</p>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/joane-alves-ribeiro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 group text-center hover:border-slate-500/50 transition-all"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
                      <LinkedInLogoIcon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-white font-medium">LinkedIn</p>
                    <p className="text-sm text-gray-400">Conecte-se</p>
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl p-8 text-center relative overflow-hidden"
                variants={fadeInUpVariants}
                custom={3}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-transparent"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <ChatBubbleIcon className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    Pronta para começar?
                  </h3>
                  <p className="text-slate-100 mb-8 leading-relaxed">
                    Tenho disponibilidade para novos projetos e adoraria saber mais sobre sua ideia. 
                    Vamos transformar seu conceito em realidade!
                  </p>
                  
                  <div className="space-y-4">
                    <motion.a
                      href="https://wa.me/5531985201743"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-white text-slate-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-400 transition-all shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChatBubbleIcon className="mr-3 w-5 h-5" />
                      Vamos conversar no WhatsApp
                    </motion.a>
                    
                    <motion.a
                      href="mailto:joane.desenvolvimentoweb@gmail.com"
                      className="inline-flex items-center justify-center w-full bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-slate-600 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <EnvelopeClosedIcon className="mr-3 w-5 h-5" />
                      Enviar um email
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              variants={fadeInUpVariants}
              custom={4}
            >
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <div className="text-3xl font-bold text-slate-400 mb-2">01h</div>
                <p className="text-gray-300">Tempo médio de resposta</p>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <div className="text-3xl font-bold text-slate-400 mb-2">100%</div>
                <p className="text-gray-300">Projetos entregues</p>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <div className="text-3xl font-bold text-slate-400 mb-2">+3</div>
                <p className="text-gray-300">Anos de experiência</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <WhatsAppButton />

        <Footer />
      </div>
    </div>
  );
}