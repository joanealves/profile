"use client";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phone = "5531985201743"; 
  const message = "Olá, gostaria de mais informações!";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: 2,
        type: "spring", 
        stiffness: 260, 
        damping: 20 
      }}
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp"
        className="group relative block"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Pulso de fundo */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Anel externo animado */}
        <motion.div
          className="absolute -inset-2 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full opacity-20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Botão principal */}
        <motion.div
          className="relative backdrop-blur-lg bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white shadow-2xl p-4 rounded-full transition-all duration-300 cursor-pointer border border-slate-400/20"
          whileHover={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(148, 163, 184, 0.3)"
          }}
        >
          <motion.div
            animate={{
              rotate: isHovered ? [0, -10, 10, -10, 0] : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.div>
          
          {/* Partículas flutuantes */}
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-slate-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }}
          />
          <motion.div
            className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-slate-300 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1
            }}
          />
        </motion.div>

        {/* Tooltip */}
        <motion.div
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          initial={{ opacity: 0, x: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            x: isHovered ? 0 : 10 
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-slate-800 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-slate-600/50 backdrop-blur-sm">
            Vamos conversar!
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-slate-800 rotate-45 -translate-y-1/2 border-r border-b border-slate-600/50"></div>
          </div>
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppButton;