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
    FaGlobe,
    FaUser,
    FaHeart
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
            className={`relative flex flex-col rounded-xl overflow-hidden cursor-pointer bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 h-full group ${
                isHovered ? "shadow-xl shadow-gray-900/50 scale-[1.02] border-gray-600/60" : "shadow-md"
            }`}
            variants={fadeInUpVariants}
            custom={index}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
                    isHovered ? "opacity-5" : ""
                }`}
                style={{ background: color }}
            />

            <div className="flex items-center p-4 pb-3">
                <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg mr-3 transition-all duration-300 ${
                        isHovered ? "shadow-lg" : ""
                    }`}
                    style={{ background: color }}
                >
                    {icon}
                </div>
                <h3 className="text-base font-semibold text-white group-hover:text-gray-100 transition-colors">
                    {title}
                </h3>
            </div>

            <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
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
            className="py-16 md:py-20 px-4 container mx-auto relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-6 text-white"
                        variants={fadeInUpVariants}
                        custom={0}
                    >
                        Sobre Mim
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full"></div>
                    </motion.h2>

                    <motion.div
                        className="max-w-4xl mx-auto space-y-6"
                        variants={fadeInUpVariants}
                        custom={1}
                    >
                        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/30">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                    <FaUser className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="text-gray-300 leading-relaxed text-base">
                                        <strong className="text-white">Desenvolvedora Full Stack</strong> com foco em front-end, 
                                        atuo desde <strong className="text-blue-400">2022</strong> criando interfaces modernas e acessíveis. 
                                        Trabalho com <strong className="text-white">React, TypeScript, Next.js, Vite</strong> e 
                                        <strong className="text-white"> Tailwind CSS</strong>, seguindo princípios de design system. Me preocupando sempre com acessibilidade.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                        <FaServer className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-lg font-semibold text-white mb-2">Backend & Dados</h2>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                           Em 2021 comecei a trabalhar com PHP. Desde <strong className="text-white">2023</strong> desenvolvo soluções com 
                                            <strong className="text-white"> Python, Django, FastAPI, Node.js</strong> e 
                                            bancos como <strong className="text-white">MySQL e PostgreSQL</strong>. E agora estou aprofundando em Mongo.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                                        <FaHeart className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <h2 className="text-lg font-semibold text-white mb-2">Design & UX</h2>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            Experiência em <strong className="text-white">UX/UI e web design desde 2014</strong>, 
                                            colaborando com equipes para entregar produtos com foco em 
                                            <strong className="text-white"> experiência do usuário e acessibilidade</strong>. Mas sempre trabalhei com design, fotografia e audiovisual.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>

                <motion.div
                    className="mb-8"
                    variants={fadeInUpVariants}
                    custom={2}
                >
                    <h3 className="text-2xl font-bold text-center text-white mb-8">
                        Minha Trajetória
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {skillsData.map((skill, index) => (
                            <SkillCard
                                key={index}
                                {...skill}
                                index={index + 3}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AboutSection;