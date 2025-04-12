import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRightIcon, ExternalLinkIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface Project {
    title: string;
    description: string;
    technologies: string[];
    image?: string;
    githubUrl?: string;
    liveUrl?: string;
}

interface ProjectsSectionProps {
    projects: Project[];
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
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
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

                <CardFooter className="pt-0 group-hover:opacity-100 transition-all duration-300 -mt-4 group-hover:mt-0">
                    <div className="flex gap-3">
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white">
                                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                                    Código
                                </Button>
                            </a>
                        )}
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline" className="bg-blue-400 hover:bg-blue-300 border-blue-400 text-white">
                                    <ExternalLinkIcon className="mr-2 h-4 w-4" />
                                    Demo
                                </Button>
                            </a>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
    const [showAll, setShowAll] = useState(false);
    const displayedProjects = showAll ? projects : projects.slice(0, 3);

    return (
        <section id="projects" className="p-12 bg-gray-800">
            <div className="container mx-auto">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-4">Projetos</h2>
                    <div className="w-24 h-1 bg-blue-400 mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Confira alguns dos projetos que desenvolvi utilizando tecnologias modernas.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    {displayedProjects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </motion.div>

                {projects.length > 3 && (
                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <Button
                            onClick={() => setShowAll(!showAll)}
                            className="px-4 py-2 rounded bg-blue-400 text-white border-2 border-blue-400 hover:bg-transparent hover:text-blue-400 transition-colors"
                        >
                            {showAll ? "Ver menos projetos" : "Ver mais projetos"}
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;