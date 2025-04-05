"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
            className="py-14 px-6 container mx-auto" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                {/* Texto principal - aumentado para dar mais destaque */}
                <div className="md:w-3/4">
                    <motion.h2
                        className="text-3xl font-bold mb-6 text-white"
                        variants={fadeInUpVariants}
                        custom={0}
                    >
                        Sobre Mim
                    </motion.h2>
                    <motion.div
                        variants={fadeInUpVariants}
                        custom={1}
                    >
                        <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                            Meu caminho na tecnologia começou pelo design. Trabalhei em agências, criando visuais e identidades para marcas. Foi nesse universo que conheci o UX/UI e me apaixonei por entender como as pessoas interagem com interfaces digitais.
                        </p>
                        <p className="text-gray-400 text-lg mb-4 leading-relaxed">
                            Durante a pandemia, me aprofundei ainda mais, fiz cursos, bootcamps e comecei a programar para dar vida às minhas ideias.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Hoje, como desenvolvedora Full Stack, combino design e código para criar produtos intuitivos, acessíveis e funcionais.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="md:w-1/4 flex justify-center mt-6 md:mt-12"
                    variants={fadeInUpVariants}
                    custom={2}
                >
                    <div className="overflow-hidden rounded-lg shadow-md"> 
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src="/perfil.jpg"
                                alt="Joane Alves"
                                width={180}
                                height={220}
                                className="w-full h-auto object-cover"
                                style={{ opacity: 0.9 }} 
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AboutSection;