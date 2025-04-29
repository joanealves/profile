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

import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProjectsSection from "../components/ProjectsSection"
import ModernSkillsSection from "../components/ModernSkillsSection";
import NeuralNetworkBackground from "../components/NeuralNetworkBackground";
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
      title: "Sistema ERP",
      description: "Plataforma de gestão empresarial para agendamentos. Ainda em desenvolvimento, agora para contar com módulos de faturamento, estoque.",
      technologies: ["React", "FastAPI", "TypeScript", "SQL"],
      image: "/erp.jpg", 
      githubUrl: "https://github.com/joanealves/erp_salao",
      liveUrl: "https://"
    },
    {
      title: "Mapas Interativos",
      description: "Aplicação de visualização geoespacial para monitoramento de terremotos em tempo real. Aplicação em desenvolvimento",
      technologies: ["React", "Mapbox", "OpenMap", "D3.js"],
      image: "/maps-project.jpg.jpg",
      githubUrl: "https://github.com/joanealves/geoview",
      liveUrl: "https://geoview-2e33.vercel.app/"
    },
    {
      title: "Plataforma CRM",
      description: "Sistema de gerenciamento de relacionamento com clientes com automação de marketing.",
      technologies: ["Next.js", "Shadcn UI", "Tailwind", "MongoDB"],
      image: "",
      githubUrl: "",
      liveUrl: "https://"
    }
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
      <NeuralNetworkBackground />

      <div className="relative z-10">
        <Header />
        <HeroSection />
        <AboutSection />
        <ProjectsSection projects={projects} />
        <ModernSkillsSection />

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
            {contactLinks.map(({ href, icon, label }) => (
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