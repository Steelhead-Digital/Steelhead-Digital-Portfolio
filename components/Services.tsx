import React from 'react';
import { SectionId } from '../types';

const services = [
  {
    id: "01",
    title: "UI/UX Design",
    description: "Interfaces that define brands."
  },
  {
    id: "02",
    title: "Web Development",
    description: "Scalable, high-performance engineering."
  },
  {
    id: "03",
    title: "Mobile Solutions",
    description: "Native interactions for any device."
  },
  {
    id: "04",
    title: "Product Strategy",
    description: "From concept to market domination."
  }
];

const Services: React.FC = () => {
  return (
    <section id={SectionId.SERVICES} className="py-32 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-medium leading-tight mb-8">
              We translate <br />
              <span className="text-white/40">complex ideas</span> <br />
              into <span className="text-accent">digital reality.</span>
            </h2>
            <p className="text-secondary text-lg max-w-md">
              Our approach is holistic. We don't just build software; we craft digital ecosystems that scale with your business.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-0">
            {services.map((service) => (
              <div key={service.id} className="group border-t border-white/10 py-8 transition-colors hover:bg-white/5 px-4 -mx-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-8">
                    <span className="text-xs font-mono text-white/30">{service.id}</span>
                    <h3 className="text-2xl font-display font-medium text-white group-hover:translate-x-2 transition-transform duration-300">
                      {service.title}
                    </h3>
                  </div>
                  <p className="hidden md:block text-secondary text-sm text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-white/10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;