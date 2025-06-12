"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, DesktopIcon, MobileIcon } from "@radix-ui/react-icons";

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
    <section id='uxshowcase' className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900" aria-labelledby="ux-journey-heading">
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
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            variants={fadeInUpVariants}
            custom={1}
          >
            Minha Jornada no UX Design
          </motion.h2>
          
          <motion.div 
            className="space-y-4 mb-8 text-lg text-gray-300"
            variants={fadeInUpVariants}
            custom={2}
          >
            <p>
              Antes de me especializar em desenvolvimento fullstack, mergulhei fundo no universo do 
              <span className="font-semibold text-blue-400"> UX/UI Design</span>. 
              Essa experiência moldou completamente minha visão sobre desenvolvimento.
            </p>
            
            <p>
              Hoje, trago essa perspectiva única para cada projeto: código que não apenas funciona, 
              mas que <span className="font-semibold text-white">proporciona experiências memoráveis</span> para quem usa.
            </p>
          </motion.div>

          
          <motion.div
            className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-8"
            variants={fadeInUpVariants}
            custom={4}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              Explore Meu Portfólio de Design
            </h3>
            <p className="text-gray-400 mb-6">
              Jogos interativos, protótipos funcionais e estudos de caso reais. 
              Descubra como penso sobre usabilidade e experiência do usuário na prática.
            </p>
            
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.open('https://ux-portifolio.vercel.app/', '_blank')}
            >
              Ver Portfólio UX/UI
              <ExternalLinkIcon className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.p 
            className="text-sm text-gray-500 italic"
            variants={fadeInUpVariants}
            custom={5}
          >
            "Design é sobre resolver problemas. Código é sobre tornar essa solução realidade."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}