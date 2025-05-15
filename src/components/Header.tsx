"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  HamburgerMenuIcon,
  Cross1Icon,
} from "@radix-ui/react-icons";

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  },
  open: {
    opacity: 1,
    x: "0%",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const mobileNavItemVariants = {
  closed: { opacity: 0, x: 20 },
  open: { opacity: 1, x: 0 }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleNavItemClick = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: "Sobre", href: "#about" },
    { label: "Projetos", href: "#projects" },
    { label: "Skills", href: "#modernskills" },
    { label: "Contato", href: "#contact" },
    { label: "UX/UI", href: "/uxui" }
  ];

  return (
    <>
      <motion.header
        className="p-6 flex justify-between items-center sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md"
        style={{ opacity: headerOpacity }}
        role="banner"
      >
        <div className="flex items-center">
          <Image
            src="/Logo.png"
            alt="Logo Joane Alves"
            width={40}
            height={40}
            className="mr-2"
            unoptimized
          />
          <h1 className="text-2xl font-bold">Joane Alves</h1>
        </div>

        <nav className="hidden md:block" aria-label="Navegação Principal">
          <ul className="flex gap-6">
            {navItems.map(({ label, href }) => (
              <li key={label}>
                <motion.a
                  href={href}
                  className="hover:text-gray-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {label}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <Cross1Icon width={24} height={24} /> : <HamburgerMenuIcon width={24} height={24} />}
        </button>
      </motion.header>

      <motion.div
        className={`fixed inset-0 bg-black/70 backdrop-blur-md md:hidden z-40 ${isMenuOpen ? "block" : "hidden"}`}
        onClick={() => setIsMenuOpen(false)}
        animate={isMenuOpen ? "open" : "closed"}
        initial="closed"
        variants={{
          open: { opacity: 1 },
          closed: { opacity: 0, display: "none" }
        }}
      />

      <motion.nav
        className={`fixed top-0 right-0 bottom-0 w-64 bg-gray-900 shadow-xl border-l border-gray-800 z-50 md:hidden p-6 pt-20 ${isMenuOpen ? "block" : "hidden"}`}
        animate={isMenuOpen ? "open" : "closed"}
        initial="closed"
        variants={mobileMenuVariants}
        aria-hidden={!isMenuOpen}
      >
        <button
          className="absolute top-6 right-6 text-white"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Fechar menu"
        >
          <Cross1Icon width={24} height={24} />
        </button>

        <ul className="flex flex-col gap-6">
          {navItems.map(({ label, href }) => (
            <motion.li key={label} variants={mobileNavItemVariants}>
              <a
                href={href}
                className="text-xl font-medium text-white hover:text-purple-400 transition-colors block py-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavItemClick(href.substring(1));
                }}
              >
                {label}
              </a>
            </motion.li>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default Header;