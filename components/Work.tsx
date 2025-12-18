import React from 'react';
import { SectionId, Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

const projects: Project[] = [
  {
    id: '1',
    title: 'Tattoo Shoppe',
    category: 'Design & Dev',
    description: 'Minimalist booking platform.',
    image: 'https://i.ibb.co/tMpQ5hy9/Screenshot-2025-12-18-135352.png',
    technologies: ['React', 'Motion'],
    link: 'https://ai.studio/apps/drive/1hPndgMn_GPlcW2vxMVjWOwm-xgBVJufm'
  },
  {
    id: '2',
    title: 'Apex Commerce',
    category: 'E-Commerce',
    description: 'High-conversion retail experience.',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop',
    technologies: ['Next.js', 'Stripe'],
  },
  {
    id: '3',
    title: 'MedLink Pro',
    category: 'Product',
    description: 'Secure provider-patient portal.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    technologies: ['React Native', 'Node'],
  },
  {
    id: '4',
    title: 'GenAI Studio',
    category: 'AI Interface',
    description: 'Next-gen content creation tools.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2232&auto=format&fit=crop',
    technologies: ['Gemini', 'Python'],
  },
  {
    id: '5',
    title: 'Vanguard',
    category: 'Branding',
    description: 'Visual identity system.',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    technologies: ['Design', 'Strategy'],
  },
];

const Work: React.FC = () => {
  return (
    <section id={SectionId.WORK} className="py-32">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-medium text-white">
            Selected <span className="text-white/30">Work</span>
          </h2>
          <span className="hidden md:block text-xs font-mono text-secondary uppercase tracking-widest">
            ( {projects.length} Projects )
          </span>
        </div>
        
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[400px]">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group relative overflow-hidden rounded-2xl bg-[#18181b] border border-white/5 cursor-pointer ${
                index === 0 || index === 3 ? 'md:col-span-2' : ''
              }`}
              onClick={() => project.link ? window.open(project.link, '_blank') : undefined}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <p className="text-xs font-mono text-accent mb-2 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.category}
                    </p>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-secondary text-sm max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                  {project.technologies.map(tech => (
                    <span key={tech} className="text-[10px] uppercase tracking-wider border border-white/20 px-2 py-1 rounded-full text-white/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {/* Contact Card in Grid */}
          <div className="bg-white text-black rounded-2xl p-8 flex flex-col justify-between group hover:bg-gray-100 transition-colors cursor-pointer"
               onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}>
            <div className="flex justify-between items-start">
              <h3 className="text-3xl font-display font-bold leading-tight">
                Start a <br/> Project
              </h3>
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            <p className="text-sm font-medium opacity-60">
              Have an idea? Let's build it together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;