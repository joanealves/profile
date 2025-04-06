"use client";
import React from "react";
import { motion } from "framer-motion";

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

const AboutSection = () => {
    return (
        <motion.section
            id="about"
            className="py-20 px-6 container mx-auto relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="flex flex-col items-center max-w-2xl mx-auto">
                <motion.h2
                    className="text-4xl font-bold mb-10 text-gray-200 relative"
                    variants={fadeInUpVariants}
                    custom={0}
                >
                    <span className="relative">
                        Sobre Mim
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full mt-2"></span>
                    </span>
                </motion.h2>

                <motion.div
                    variants={fadeInUpVariants}
                    custom={1}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-lg p-8 rounded-xl border border-white/10 shadow-xl"
                >
                    <div className="space-y-6">
                        <motion.p
                            className="text-gray-300 text-lg leading-relaxed"
                            variants={fadeInUpVariants}
                            custom={2}
                        >
                            Meu caminho na tecnologia começou pelo <span className="text-blue-400 font-medium">design</span>. Trabalhei em agências, criando visuais e identidades para marcas. Foi nesse universo que conheci o <span className="text-blue-400 font-medium">UX/UI</span> e me apaixonei por entender como as pessoas interagem com interfaces digitais.
                        </motion.p>

                        <motion.p
                            className="text-gray-300 text-lg leading-relaxed"
                            variants={fadeInUpVariants}
                            custom={3}
                        >
                            Durante a pandemia, me aprofundei ainda mais, fiz cursos, bootcamps e comecei a <span className="text-blue-400 font-medium">programar</span> para dar vida às minhas ideias.
                        </motion.p>

                        <motion.p
                            className="text-gray-300 text-lg leading-relaxed"
                            variants={fadeInUpVariants}
                            custom={4}
                        >
                            Depois disso, já participei de <span className="text-blue-400 font-medium">vários projetos desafiadores</span>, atuando tanto no <span className="text-blue-400 font-medium">front</span> quanto no <span className="text-blue-400 font-medium">back-end</span>, sempre com foco em criar <span className="text-blue-400 font-medium">experiências intuitivas</span> e <span className="text-blue-400 font-medium">soluções eficientes</span>.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AboutSection;
