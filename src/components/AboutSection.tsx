"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FaPalette,
    FaLaptopCode,
    FaBolt,
    FaCode,
    FaLayerGroup,
    FaServer,
    FaRocket,
    FaGlobe
} from "react-icons/fa";

const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1.0],
            delay: custom * 0.1
        }
    })
};

interface SkillCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    index: number;
}

const SkillCard = ({ title, description, icon, color, index }: SkillCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative flex flex-col rounded-xl overflow-hidden cursor-pointer bg-gray-800/80 backdrop-blur-sm border border-white/10 transition-all duration-300 h-full ${isHovered ? "shadow-xl scale-105" : "shadow-md"
                }`}
            variants={fadeInUpVariants}
            custom={index}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-10" : ""
                    }`}
                style={{ background: color }}
            />

            <div className="flex items-center p-4">
                <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg mr-3`}
                    style={{ background: color }}
                >
                    {icon}
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>

            <div className={`p-4 pt-0 text-gray-300 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-70"
                }`}>
                <p>{description}</p>
            </div>
        </motion.div>
    );
};

const AboutSection = () => {
    const skillsData = [
        {
            title: "Design Gráfico",
            description: "Iniciei no design criando visuais e identidades para marcas em agências.",
            icon: <FaPalette className="h-5 w-5 text-white" />,
            color: "#3182CE" 
        },
        {
            title: "UX/UI Design",
            description: "Me apaixonei por entender como as pessoas interagem com interfaces digitais.",
            icon: <FaLaptopCode className="h-5 w-5 text-white" />,
            color: "#805AD5" 
        },
        {
            title: "Aprendizado",
            description: "Durante a pandemia, investi em cursos e bootcamps para ampliar conhecimentos.",
            icon: <FaBolt className="h-5 w-5 text-white" />,
            color: "#DD6B20" 
        },
        {
            title: "Programação",
            description: "Comecei a programar para dar vida às minhas ideias e projetos.",
            icon: <FaCode className="h-5 w-5 text-white" />,
            color: "#38B2AC" 
        },
        {
            title: "Frontend",
            description: "Desenvolvi habilidades criando interfaces interativas e responsivas.",
            icon: <FaLayerGroup className="h-5 w-5 text-white" />,
            color: "#D53F8C" 
        },
        {
            title: "Backend",
            description: "Aprendi a construir o lado servidor dos aplicativos para soluções completas.",
            icon: <FaServer className="h-5 w-5 text-white" />,
            color: "#2B6CB0" 
        },
        {
            title: "Projetos Completos",
            description: "Participei de vários projetos desafiadores como desenvolvedora full stack.",
            icon: <FaRocket className="h-5 w-5 text-white" />,
            color: "#00B5D8" 
        },
        {
            title: "Experiências Intuitivas",
            description: "Foco em criar experiências intuitivas e soluções eficientes.",
            icon: <FaGlobe className="h-5 w-5 text-white" />,
            color: "#4FD1C5" 
        }
    ];

    return (
        <motion.section
            id="about"
            className="py-20 px-6 container mx-auto relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="max-w-5xl mx-auto">
                <motion.h2
                    className="text-4xl font-bold mb-6 text-gray-200 text-center"
                    variants={fadeInUpVariants}
                    custom={0}
                >
                    <span className="relative inline-block">
                        Sobre Mim
                        
                    </span>
                </motion.h2>

                <motion.p

                    className="text-gray-300 text-lg mb-12 text-center max-w-2x mx-auto"
                    variants={fadeInUpVariants}
                    custom={1}
                >
                    Desenvolvedora Full Stack com foco em front-end, atuo desde 2022 criando interfaces modernas e acessíveis com React , 
                    TypeScript , Next.js , Vite , ShadCN UI e Tailwind CSS , seguindo princípios de design system.
                    Há 1,5 ano também desenvolvo soluções no back-end com Python , Django , FastAPI , Node.js e bancos de dados como MySQL e PostgreSQL .
                    Tenho experiência em UX/UI e web design desde 2014, colaborando com equipes multidisciplinares para entregar produtos com foco na experiência do usuário e acessibilidade (A11Y).
                    Apaixonada por tecnologia e metodologias ágeis, sempre em busca de criar soluções inovadoras e eficientes.
                </motion.p>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={fadeInUpVariants}
                    custom={2}
                >
                    {skillsData.map((skill, index) => (
                        <SkillCard
                            key={index}
                            {...skill}
                            index={index + 2}
                        />
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AboutSection;