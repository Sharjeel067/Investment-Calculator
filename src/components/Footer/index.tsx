import React from 'react';
import { FaHeart, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const Footer = () => (
  <footer className="w-full border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm py-4 sm:py-6 px-3 sm:px-6 flex flex-col items-center mt-6 sm:mt-8">
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2 mb-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center">
      <div className="flex items-center gap-2">
        Made with 
        <FaHeart className="text-red-500 mx-1 animate-pulse text-xs sm:text-sm" /> 
        by
      </div>
      <span className="font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
        Muhammad Sharjeel
      </span>
    </div>
    
    <div className="flex gap-3 sm:gap-4 mb-3">
      <a 
        href="https://www.linkedin.com/in/amsharjeel-067/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 sm:p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110 shadow-sm active:scale-95"
        title="LinkedIn Profile"
      >
        <FaLinkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
      </a>
      <a 
        href="https://github.com/Sharjeel067" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 sm:p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-all duration-200 hover:scale-110 shadow-sm active:scale-95"
        title="GitHub Profile"
      >
        <FaGithub size={16} className="sm:w-[18px] sm:h-[18px]" />
      </a>
      <a 
        href="https://www.sharjeel.tech/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="p-2 sm:p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 hover:scale-110 shadow-sm active:scale-95"
        title="Portfolio Website"
      >
        <FaGlobe size={16} className="sm:w-[18px] sm:h-[18px]" />
      </a>
    </div>
    
    <div className="text-xs text-slate-500 dark:text-slate-500 text-center px-4">
      © 2025 Investment Calculator. Built with React & Tailwind CSS
    </div>
  </footer>
);

export default Footer;