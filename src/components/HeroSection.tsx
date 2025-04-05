import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const staggerContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const fadeInUpVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: custom * 0.2,
                duration: 0.5
            }
        })
    };

    return (
        <motion.section
            className="relative flex flex-col items-center justify-center text-center h-[90vh] px-4 z-20"
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
    );
};

export default HeroSection;