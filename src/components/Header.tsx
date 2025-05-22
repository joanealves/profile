"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
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
      stiffness: 300,
      damping: 30,
      duration: 0.3
    }
  },
  open: {
    opacity: 1,
    x: "0%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.3,
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const mobileNavItemVariants = {
  closed: { opacity: 0, x: 20 },
  open: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const handleNavItemClick = useCallback((id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const navItems = useMemo(() => [
    { label: "Sobre", href: "#about", id: "about" },
    { label: "Projetos", href: "#projects", id: "projects" },
    { label: "Skills", href: "#modernSkills", id: "modernSkills" },
    { label: "Contato", href: "#contact", id: "contact" },
    { label: "UX/UI", href: "#uxshowcase", id: "uxshowcase" },
  ], []);

  const NavItem = React.memo(({ item, isMobile = false }: { item: typeof navItems[0], isMobile?: boolean }) => {
    const handleClick = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      handleNavItemClick(item.id);
    }, [item]);

    const baseClasses = isMobile 
      ? "text-xl font-medium text-white hover:text-purple-400 transition-colors block py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-2"
      : "hover:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg px-2 py-1";

    if (isMobile) {
      return (
        <motion.li variants={mobileNavItemVariants}>
          <button
            onClick={handleClick}
            className={baseClasses}
            type="button"
            aria-label={`Navegar para ${item.label}`}
          >
            {item.label}
          </button>
        </motion.li>
      );
    }

    return (
      <li>
        <motion.button
          onClick={handleClick}
          className={baseClasses}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          type="button"
          aria-label={`Navegar para ${item.label}`}
        >
          {item.label}
        </motion.button>
      </li>
    );
  });

  NavItem.displayName = 'NavItem';

  if (!isMounted) {
    return (
      <header className="p-6 flex justify-between items-center sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md">
        <div className="flex items-center">
          <Image
            src="/Logo.png"
            alt="Logo Joane Alves"
            width={40}
            height={40}
            className="mr-2"
            priority
            sizes="40px"
          />
          <h1 className="text-2xl font-bold">Joane Alves</h1>
        </div>

        <nav className="hidden md:block" aria-label="Navegação Principal">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </ul>
        </nav>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
          aria-label="Abrir menu"
          type="button"
        >
          <HamburgerMenuIcon width={24} height={24} />
        </button>
      </header>
    );
  }

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
            priority
            sizes="40px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAoACgDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABgAHA//EACgQAAIBAwMEAQUBAAAAAAAAAAECAwAEEQUSITFBBhNRImFxgZGhsf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AOe1CzurtFWzsp2QOWzjaKl1+wsNOkWO8jXPFBeVJznGNuflK9f+6iu8BKDzBnJ7UUdS0e4jlhuYkLqSg+6kS0GpanNFp+m28QLOzyHmQNJNNjJ9quGP1wfyGMdK2Ph/SNLs7FJ76wkklvAoyksu1lVh0UDgmrNw0emGd4bF25YtkVd8C2Nt6LCf8s8oJHvR6jhBq2u3l6r22XQHDHB9a4uFWHOBnaOmMmgUDe25BSRY8Dv2pXs3zBKn5V1JzQKW+7NkMjgVKjK+l+n8lSqlqOQ5iO5gDOWPwKYYhU5w//Z"
          />
          <h1 className="text-2xl font-bold">Joane Alves</h1>
        </div>

        <nav className="hidden md:block" aria-label="Navegação Principal">
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
          </ul>
        </nav>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          type="button"
        >
          {isMenuOpen ? <Cross1Icon width={24} height={24} /> : <HamburgerMenuIcon width={24} height={24} />}
        </button>
      </motion.header>

      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md md:hidden z-40"
          onClick={closeMenu}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {isMenuOpen && (
        <motion.nav
          className="fixed top-0 right-0 bottom-0 w-64 bg-gray-900 shadow-xl border-l border-gray-800 z-50 md:hidden p-6 pt-20"
          animate="open"
          initial="closed"
          exit="closed"
          variants={mobileMenuVariants}
          aria-hidden={!isMenuOpen}
          role="navigation"
          aria-label="Menu de navegação mobile"
        >
          <button
            className="absolute top-6 right-6 text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
            onClick={closeMenu}
            aria-label="Fechar menu"
            type="button"
          >
            <Cross1Icon width={24} height={24} />
          </button>

          <ul className="flex flex-col gap-6">
            {navItems.map((item) => (
              <NavItem key={item.id} item={item} isMobile />
            ))}
          </ul>
        </motion.nav>
      )}
    </>
  );
};

export default Header;