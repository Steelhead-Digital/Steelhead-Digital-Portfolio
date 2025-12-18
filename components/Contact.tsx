import React, { useState } from 'react';
import { SectionId } from '../types';
import { generateProjectEstimation } from '../services/geminiService';
import { Sparkles, Loader2, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types for the structured response
interface EstimationResult {
  estimatedDuration: string;
  suggestedTechStack: string[];
  complexityLevel: string;
  briefAnalysis: string;
}

const Contact: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const estimation = await generateProjectEstimation(input);
      setResult(estimation);
    } catch (err) {
      setError("We couldn't generate an estimate right now. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 md:py-32 bg-surface relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16">
        
        {/* Left Column: Traditional Contact */}
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-medium mb-8">
            Let's build <br /> something <span className="text-white/40">great.</span>
          </h2>
          <p className="text-secondary text-lg mb-12 leading-relaxed max-w-md">
            Whether you have a fully drafted spec or just a rough idea, we're here to help you turn it into reality.
          </p>

          <div className="space-y-2 mb-12">
            <p className="text-white text-xl">hello@steelheaddigital.com</p>
            <p className="text-secondary">+1 (555) 123-4567</p>
            <p className="text-secondary">San Francisco, CA</p>
          </div>

          <div className="flex gap-6 text-sm font-medium uppercase tracking-widest text-white/50">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>

        {/* Right Column: AI Project Estimator */}
        <div className="bg-[#09090b] p-8 md:p-10 border border-white/5 rounded-2xl relative">
          <div className="absolute top-6 right-6">
            <Sparkles className="text-yellow-500/80 animate-pulse" size={24} />
          </div>
          
          <h3 className="text-2xl font-display font-medium mb-2">AI Project Estimator</h3>
          <p className="text-secondary text-sm mb-6">
            Describe your project idea below. Our AI consultant will analyze it and provide an instant preliminary scope.
          </p>

          <form onSubmit={handleEstimate} className="relative mb-6">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., I need a marketplace for vintage watches with real-time bidding and authentication..."
              className="w-full bg-surface border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 h-32 resize-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute bottom-4 right-4 bg-white text-black rounded-lg p-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/10 pt-6 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Analysis</span>
                    <p className="text-white mt-1 text-sm leading-relaxed">{result.briefAnalysis}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Est. Duration</span>
                      <p className="text-white mt-1">{result.estimatedDuration}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Complexity</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`w-2 h-2 rounded-full ${
                          result.complexityLevel === 'High' ? 'bg-red-500' :
                          result.complexityLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <p className="text-white">{result.complexityLevel}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Suggested Stack</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.suggestedTechStack.map((tech) => (
                        <span key={tech} className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-1 rounded text-secondary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-xs text-secondary mb-3">Does this sound right?</p>
                  <button className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors">
                    Book a Consultation Call
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;