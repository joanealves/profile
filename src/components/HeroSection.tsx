import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, DownloadIcon, EyeOpenIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';

const MinimalHeroSection = () => {
    const scrollToSection = (sectionId: string) => {
        document.getElementById(sectionId)?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex items-center">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="space-y-8"
                    >
                        

                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Joane 
                                    Alves</span>
                                <br />
                            </h1>
                            
                            <h2 className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
                                Desenvolvedora Full Stack & UX/UI Designer
                                <br />
                            </h2>
                        </div>

                        <motion.div 
                            className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {['React', 'Next.js', 'Python', 'UX/UI Design'].map((skill) => (
                                <span
                                    key={skill}
                                    className="px-4 py-2 bg-gray-800/60 border border-gray-700/50 rounded-full text-sm text-gray-300 backdrop-blur-sm hover:bg-gray-700/60 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </motion.div>

                        <motion.div 
                            className="flex flex-wrap justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                                onClick={() => scrollToSection('projects')}
                            >
                                <EyeOpenIcon className="mr-2 h-4 w-4" />
                                Ver Projetos
                            </Button>
                            
                           
                        </motion.div>
                        


                        <motion.div 
                            className="flex justify-center gap-6 pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <a
                                href="https://github.com/joanealves"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                                aria-label="GitHub"
                            >
                                <GitHubLogoIcon className="h-6 w-6" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/joane-alves-ribeiro/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-gray-800 rounded-lg"
                                aria-label="LinkedIn"
                            >
                                <LinkedInLogoIcon className="h-6 w-6" />
                            </a>
                        </motion.div>
                    </motion.div>
                    

                    <motion.div
                        className="flex justify-center mt-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                    >
                        <motion.button
                            onClick={() => scrollToSection('about')}
                            className="flex flex-col items-center text-gray-400 hover:text-gray-300 transition-colors group cursor-pointer"
                            animate={{
                                y: [0, 8, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <span className="text-sm mb-2 group-hover:text-gray-300">Saiba mais</span>
                            <ChevronDownIcon className="h-6 w-6" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default MinimalHeroSection;