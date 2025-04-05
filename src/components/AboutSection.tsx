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
            className="py-14 px-6 container mx-auto relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="flex flex-col items-center max-w-3xl mx-auto">
                <motion.h2
                    className="text-3xl font-bold mb-8 text-gray-200 text-center"
                    variants={fadeInUpVariants}
                    custom={0}
                >
                    Sobre Mim
                </motion.h2>
                <motion.div
                    variants={fadeInUpVariants}
                    custom={1}
                    className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20"
                >
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed text-center">
                        Meu caminho na tecnologia começou pelo design. Trabalhei em agências, criando visuais e identidades para marcas. Foi nesse universo que conheci o UX/UI e me apaixonei por entender como as pessoas interagem com interfaces digitais.
                    </p>
                    <p className="text-gray-300 text-lg mb-6 leading-relaxed text-center">
                        Durante a pandemia, me aprofundei ainda mais, fiz cursos, bootcamps e comecei a programar para dar vida às minhas ideias.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AboutSection;
