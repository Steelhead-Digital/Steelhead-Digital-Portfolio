import React from 'react';
import { motion } from 'framer-motion';
import { SectionId } from '../types';
import { ArrowDownRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id={SectionId.HERO} className="min-h-screen flex flex-col justify-center relative pt-20 px-4">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-secondary text-sm font-mono mb-8 tracking-widest uppercase">
                Est. 2024 — Portland, OR
              </h2>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[12vw] leading-[0.8] font-display font-bold tracking-tighter text-white mix-blend-exclusion"
            >
              DIGITAL
              <br />
              <span className="text-white/20">CRAFTS</span>
            </motion.h1>
          </div>

          <div className="lg:col-span-4 pb-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col gap-8"
            >
              <p className="text-secondary text-lg leading-relaxed max-w-md">
                We are a design-led development studio. We build immersive digital experiences that define brands and drive growth.
              </p>
              
              <div className="flex gap-4 items-center">
                 <button 
                   onClick={() => document.getElementById(SectionId.WORK)?.scrollIntoView({ behavior: 'smooth' })}
                   className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
                 >
                   <ArrowDownRight className="group-hover:rotate-[-45deg] transition-transform duration-300" size={20} />
                 </button>
                 <span className="text-xs font-mono uppercase tracking-widest text-white/50">Scroll to Explore</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-white/[0.02] rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;