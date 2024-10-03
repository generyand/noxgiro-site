import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useToggle from '../../hooks/useToggle';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact Sales', path: '/contact' },
  { name: 'Blog', path: '/blog' },
];

const DesktopNav = () => (
  <nav className="hidden space-x-6 md:flex">
    {navItems.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className="text-lg font-medium transition duration-300 hover:text-blue-400"
      >
        {item.name}
      </Link>
    ))}
  </nav>
);

const MobileNav = ({ isOpen, closeMenu }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 right-0 text-center bg-gray-900 shadow-lg md:hidden top-full"
      >
        <div className="container px-4 py-6 mx-auto">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-lg font-medium transition duration-300 hover:text-blue-400"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>
    )}
  </AnimatePresence>
);

const MobileMenuButton = ({ isOpen, toggle }) => (
  <button 
    className="text-white md:hidden focus:outline-none" 
    onClick={toggle} 
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
  </button>
);

const Header = () => {
  const [isMenuOpen, toggleMenu] = useToggle(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 text-white bg-gray-900">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
          {/* <img src="src/assets/noxgiro-logo.svg" alt="NoxGiro" className="w-10 h-10" /> */}
          <p className=""><span className="text-blue-400">Nox</span>Giro</p>
        </Link>
        <DesktopNav />
        <MobileMenuButton isOpen={isMenuOpen} toggle={toggleMenu} />
      </div>
      <MobileNav isOpen={isMenuOpen} closeMenu={() => toggleMenu(false)} />
    </header>
  );
};

export default Header;