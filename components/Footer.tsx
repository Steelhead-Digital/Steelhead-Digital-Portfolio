import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-secondary text-sm">
          © {new Date().getFullYear()} Steelhead Digital. All rights reserved.
        </p>
        <p className="text-white/20 text-xs font-mono">
          DESIGNED IN THE VOID
        </p>
      </div>
    </footer>
  );
};

export default Footer;