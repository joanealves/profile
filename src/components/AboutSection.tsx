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
            color: "#3182CE" // blue-600
        },
        {
            title: "UX/UI Design",
            description: "Me apaixonei por entender como as pessoas interagem com interfaces digitais.",
            icon: <FaLaptopCode className="h-5 w-5 text-white" />,
            color: "#805AD5" // purple-600
        },
        {
            title: "Aprendizado",
            description: "Durante a pandemia, investi em cursos e bootcamps para ampliar conhecimentos.",
            icon: <FaBolt className="h-5 w-5 text-white" />,
            color: "#DD6B20" // orange-600
        },
        {
            title: "Programação",
            description: "Comecei a programar para dar vida às minhas ideias e projetos.",
            icon: <FaCode className="h-5 w-5 text-white" />,
            color: "#38B2AC" // teal-600
        },
        {
            title: "Frontend",
            description: "Desenvolvi habilidades criando interfaces interativas e responsivas.",
            icon: <FaLayerGroup className="h-5 w-5 text-white" />,
            color: "#D53F8C" // pink-600
        },
        {
            title: "Backend",
            description: "Aprendi a construir o lado servidor dos aplicativos para soluções completas.",
            icon: <FaServer className="h-5 w-5 text-white" />,
            color: "#2B6CB0" // blue-700
        },
        {
            title: "Projetos Completos",
            description: "Participei de vários projetos desafiadores como desenvolvedora full stack.",
            icon: <FaRocket className="h-5 w-5 text-white" />,
            color: "#00B5D8" // cyan-600
        },
        {
            title: "Experiências Intuitivas",
            description: "Foco em criar experiências intuitivas e soluções eficientes.",
            icon: <FaGlobe className="h-5 w-5 text-white" />,
            color: "#4FD1C5" // teal-400
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
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full mt-2"></span>
                    </span>
                </motion.h2>

                <motion.p
                    className="text-gray-300 text-lg mb-12 text-center max-w-2x0 mx-auto"
                    variants={fadeInUpVariants}
                    custom={1}
                >
                    Desenvolvedora Full Stack, especializada em tecnologias front-end, como React, TypeScript, Next.js e Vite. Trabalho com bibliotecas de componentes modernas como ShadCN UI e Tailwind CSS , que seguem princípios de design systems, contribuindo para interfaces consistentes, acessíveis e eficientes. Minha trajetória profissional é marcada pela liderança de projetos full stack e pela colaboração próxima com equipes de UX/UI, onde implemento soluções tecnológicas que priorizam a experiência do usuário e a acessibilidade.
                    Minha expertise técnica abrange tanto o front-end, com React, JavaScript, TypeScript, Tailwind CSS, Chakra UI e Styled-components, quanto o back-end, com Python, Django, FastAPI, Node.js e PHP. Também tenho experiência em bancos de dados como MySQL e PostgreSQL, além de integrações com APIs, incluindo Google Maps API e REST.
                    Sou apaixonada por criar interfaces intuitivas e acessíveis que transformam a experiência digital
                    dos usuários. Estou sempre em busca de aprender novas tecnologias.
                    Comprometida com boas práticas de programação, e metodologias ágeis. Minha abordagem combina
                    criatividade e eficiência para entregar soluções robustas e alinhadas às necessidades do projeto
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