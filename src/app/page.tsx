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

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
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
      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      <div className="relative z-10">
        <Header />
        <HeroSection />
      
        
        <AboutSection />      

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