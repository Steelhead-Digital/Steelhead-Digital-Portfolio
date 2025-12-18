import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="bg-background min-h-screen text-primary selection:bg-white selection:text-black">
        <Navbar />
        <main>
          <Hero />
          <Work />
          <Services />
          <Contact />
        </main>
        <Footer />
        <AuthModal />
      </div>
    </AuthProvider>
  );
};

export default App;