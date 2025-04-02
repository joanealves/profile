"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export default function UXUI() {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <header className="p-6 flex justify-between items-center bg-gray-900/90 backdrop-blur-md">
                <Link href="/">
                    <h1 className="text-2xl font-bold">Joane Alves</h1>
                </Link>
                <nav aria-label="Navegação Principal">
                    <ul className="flex gap-6">
                        <li>
                            <Link href="/" className="hover:text-gray-400 transition-colors">
                                Voltar ao Portfólio
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className="container mx-auto p-8">
                <motion.h1
                    className="text-4xl font-bold mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    UX/UI Design
                </motion.h1>

                <motion.p
                    className="text-xl mb-6 text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Minha abordagem para criar experiências de usuário intuitivas e designs de interface atraentes.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <Card className="bg-gray-800 border-gray-700 h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl text-white">Design Centrado no Usuário</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400">
                                    Meu processo de design é totalmente focado nas necessidades, objetivos e preferências dos usuários. Através de pesquisas detalhadas e testes de usabilidade, crio soluções que não apenas resolvem problemas reais, mas também proporcionam experiências agradáveis.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Card className="bg-gray-800 border-gray-700 h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl text-white">Interfaces Intuitivas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400">
                                    Desenvolvo interfaces que são fáceis de entender e navegar, com elementos visuais consistentes e hierarquia clara. Meu objetivo é criar designs que os usuários possam utilizar de forma natural e sem esforço.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold mb-6">Meu Processo de Design</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { phase: "Pesquisa", desc: "Entendendo os usuários e suas necessidades" },
                            { phase: "Protótipo", desc: "Desenvolvendo soluções visuais e testando conceitos" },
                            { phase: "Teste", desc: "Validando designs e coletando feedback" },
                            { phase: "Iteração", desc: "Refinando com base em dados e insights" }
                        ].map((item, index) => (
                            <Card key={item.phase} className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-xl text-white">{item.phase}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-400">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            </main>

            <footer className="p-6 text-center text-gray-400 bg-gray-950">
                <p>© {new Date().getFullYear()} Joane Alves - Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}