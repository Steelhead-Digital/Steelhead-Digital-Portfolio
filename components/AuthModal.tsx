import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isModalOpen, closeAuthModal, login, register } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLoginView) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeAuthModal}
      />
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#09090b] border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <button 
            onClick={closeAuthModal}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-display font-medium text-white mb-2">
            {isLoginView ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-secondary text-sm mb-6">
            {isLoginView ? 'Enter your credentials to access your account.' : 'Join us to track your projects and estimates.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <div>
                <label className="block text-xs font-medium text-secondary uppercase tracking-wider mb-1.5">Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            
            <div>
              <label className="block text-xs font-medium text-secondary uppercase tracking-wider mb-1.5">Email</label>
              <input 
                type="email" 
                required 
                className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-secondary uppercase tracking-wider mb-1.5">Password</label>
              <input 
                type="password" 
                required 
                minLength={6}
                className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 flex justify-center items-center"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isLoginView ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              type="button"
              onClick={() => {
                setIsLoginView(!isLoginView);
                setError(null);
                setFormData({ name: '', email: '', password: '' });
              }}
              className="text-sm text-secondary hover:text-white transition-colors"
            >
              {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};