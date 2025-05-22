"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: custom * 0.1
    }
  })
};

export default function UXShowcaseSection() {
  return (
    <section className="py-20 bg-slate-900/95 border-y border-slate-800/50" aria-labelledby="ux-journey-heading">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <motion.h2 
            id="ux-journey-heading"
            className="text-3xl md:text-4xl font-bold mb-6 "
            variants={fadeInUpVariants}
            custom={1}
          >
            Minha Jornada no Design
          </motion.h2>
          
          <motion.div 
            className="space-y-4 mb-8 text-lg text-slate-300"
            variants={fadeInUpVariants}
            custom={2}
          >
            <p>
              Antes de me especializar em desenvolvimento fullstack, mergulhei fundo no universo do 
              <span className="font-semibold text-purple-400"> UX/UI Design</span>. 
              Essa experiência moldou completamente minha visão sobre desenvolvimento.
            </p>
            
            <p>
              Hoje, trago essa perspectiva única para cada projeto: código que não apenas funciona, 
              mas que <span className="font-semibold text-slate-200">proporciona experiências memoráveis</span> para quem usa.
            </p>
          </motion.div>

          <motion.div
            className=" dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-8"
            variants={fadeInUpVariants}
            custom={3}
          >
            <h3 className="text-xl font-semibold mb-4 text-white dark:text-gray-200">
              Explore Meu Portfólio de Design
            </h3>
            <p className="text-gray-400 dark:text-gray-400 mb-6">
              Jogos interativos, protótipos funcionais e estudos de caso reais. 
              Descubra como penso sobre usabilidade e experiência do usuário na prática.
            </p>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
            >
              Ver Portfólio UX/UI
              <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.p 
            className="text-sm text-slate-500 italic"
            variants={fadeInUpVariants}
            custom={4}
          >
            "Design é sobre resolver problemas. Código é sobre tornar essa solução realidade."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}