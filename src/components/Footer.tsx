"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    GitHubLogoIcon,
    LinkedInLogoIcon,
    EnvelopeClosedIcon,
    ChatBubbleIcon,
    HeartFilledIcon,
    ArrowUpIcon
} from "@radix-ui/react-icons";
import Image from "next/image";

const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0],
            delay: custom * 0.1
        }
    })
};

const contactLinks = [
    {
        href: process.env.NEXT_PUBLIC_GITHUB_PROFILE || "https://github.com/joanealves",
        icon: <GitHubLogoIcon className="w-5 h-5" />,
        label: "GitHub"
    },
    {
        href: process.env.NEXT_PUBLIC_LINKEDIN_PROFILE || "https://www.linkedin.com/in/joane-alves-ribeiro/",
        icon: <LinkedInLogoIcon className="w-5 h-5" />,
        label: "LinkedIn"
    },
    {
        href: `mailto:${process.env.NEXT_PUBLIC_EMAIL || "joane.desenvolvimentoweb@gmail.com"}`,
        icon: <EnvelopeClosedIcon className="w-5 h-5" />,
        label: "Email"
    },
    {
        href: "https://wa.me/5531985201743",
        icon: <ChatBubbleIcon className="w-5 h-5" />,
        label: "WhatsApp"
    }
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <motion.footer
            className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-400 pt-16 pb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <motion.div
                        className="flex items-center mb-6 md:mb-0"
                        variants={fadeInUpVariants}
                        custom={0}
                    >
                        <Image
                            src="/Logo.png"
                            alt="Logo Joane Alves"
                            width={50}
                            height={50}
                            className="mr-4"
                        />
                        <div>
                            <h3 className="text-xl font-bold text-white">Joane Alves</h3>
                            <p className="text-sm text-purple-400">Desenvolvedora Full Stack</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        variants={fadeInUpVariants}
                        custom={1}
                    >
                        <div>
                            <h4 className="text-white font-medium mb-2">Navegação</h4>
                            <ul className="grid grid-cols-2 gap-x-4 space-y-1">
                                <li><a href="#about" className="hover:text-purple-400 transition-colors">Sobre</a></li>
                                <li><a href="#projects" className="hover:text-purple-400 transition-colors">Projetos</a></li>
                                <li><a href="/uxui" className="hover:text-purple-400 transition-colors">UX/UI</a></li>
                                <li><a href="#contact" className="hover:text-purple-400 transition-colors">Contato</a></li>
                            </ul>
                        </div>


                    </motion.div>
                </div>

                <motion.hr
                    className="border-gray-800 mb-8"
                    variants={fadeInUpVariants}
                    custom={2}
                />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <motion.p
                        className="text-sm mb-4 md:mb-0"
                        variants={fadeInUpVariants}
                        custom={3}
                    >
                        © {currentYear} Joane Alves - Desenvolvido com <HeartFilledIcon className="inline text-purple-500 w-4 h-4" /> - Todos os direitos reservados.
                    </motion.p>

                    <motion.div
                        className="flex space-x-4"
                        variants={fadeInUpVariants}
                        custom={4}
                    >
                        {contactLinks.map(({ href, icon, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                aria-label={`Link para ${label}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple-400 transition-colors p-2"
                                whileHover={{ scale: 1.2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                {icon}
                            </motion.a>
                        ))}

                        <motion.button
                            onClick={scrollToTop}
                            aria-label="Voltar ao topo"
                            className="ml-2 p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors text-white"
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <ArrowUpIcon className="w-4 h-4" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;