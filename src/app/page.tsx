"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
  ChatBubbleIcon,
} from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import NeuralNetworkBackground from "../components/NeuralNetworkBackground";

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
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useEffect(() => {
    // Set loaded state after component mounts to enable animations
    setIsLoaded(true);
  }, []);

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
    "React", "TypeScript", "Next.js",
    "Django", "FastAPI", "Tailwind",
    "UX/UI Design", "Framer Motion"
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
        </motion.header>

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
        <motion.section
          id="about"
          className="p-12 text-center container mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
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
            Desenvolvedora Full Stack com paixão por criar interfaces intuitivas e eficientes.
            Combino expertise técnica em React, TypeScript, Django e FastAPI com um olhar atento ao design UX/UI.
          </motion.p>
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

        {/* Skills Section with Animation */}
        <motion.section
          id="skills"
          className="p-12 text-center container mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-8"
            variants={fadeInUpVariants}
            custom={0}
          >
            Skills
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            variants={fadeInUpVariants}
            custom={1}
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="bg-gray-700 px-4 py-2 rounded-full text-sm"
                whileHover={{
                  backgroundColor: "#553C9A",
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1 * index, duration: 0.5 }
                }}
                viewport={{ once: true }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

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

        {/* Footer */}
        <footer className="p-6 text-center text-gray-400 bg-gray-950">
          <p>© {new Date().getFullYear()} Joane Alves - Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}