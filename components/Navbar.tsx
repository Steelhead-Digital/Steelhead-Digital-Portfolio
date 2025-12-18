import React, { useState, useEffect } from 'react';
import { Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { SectionId } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { id: SectionId.WORK, label: 'Work' },
  { id: SectionId.SERVICES, label: 'Expertise' },
  { id: SectionId.AGENCY, label: 'Agency' },
  { id: SectionId.CONTACT, label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, openAuthModal, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 transition-all duration-500 ${
            isScrolled ? 'bg-[#09090b]/80 shadow-2xl shadow-black/50' : 'bg-[#09090b]/40'
          }`}
        >
          <div className="flex items-center gap-8">
            <div 
              className="text-lg font-display font-bold tracking-tight cursor-pointer select-none"
              onClick={() => scrollToSection(SectionId.HERO)}
            >
              SD®
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-xs uppercase tracking-widest font-medium text-secondary hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
              
              <div className="h-3 w-px bg-white/10" />

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 top-full mt-4 w-48 bg-[#18181b] border border-white/10 rounded-xl p-2 shadow-2xl"
                      >
                        <div className="px-3 py-2 border-b border-white/5 mb-1">
                          <p className="text-xs text-secondary truncate">{user.email}</p>
                        </div>
                        <button 
                          onClick={() => { logout(); setIsProfileOpen(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <LogOut size={12} /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={openAuthModal}
                  className="text-xs uppercase tracking-widest font-medium text-white hover:text-white/70 transition-colors"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white pointer-events-auto"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#09090b] pt-32 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-4xl font-display font-medium text-white hover:text-white/50 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              
              <div className="pt-8 border-t border-white/10 w-full flex flex-col items-center gap-4">
                {user ? (
                  <button
                    onClick={() => { logout(); setIsMobileOpen(false); }}
                    className="text-lg font-mono text-red-400"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => { openAuthModal(); setIsMobileOpen(false); }}
                    className="text-lg font-mono text-white"
                  >
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;