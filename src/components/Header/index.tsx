import React from 'react';
// import { FaMoon, FaSun } from 'react-icons/fa';
import Image from 'next/image';

const Header = () => {

  return (
    <header className="w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="shrink-0">
          <Image 
            src="/logo.jpeg" 
            alt="Logo" 
            width={28} 
            height={28}
            className="sm:w-8 sm:h-8 rounded-sm" 
          />
        </div>
        <span className="text-base sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent truncate">
          Investment Calculator
        </span>
      </div>
      
      {/* Placeholder for future theme toggle */}
      <div className="shrink-0">
        {/* Theme toggle can be uncommented when needed */}
        {/* <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 hover:scale-105 shadow-sm"
        >
          {isDark ? (
            <FaSun className="text-sm sm:text-lg text-amber-500" />
          ) : (
            <FaMoon className="text-sm sm:text-lg text-slate-600" />
          )}
        </button> */}
      </div>
    </header>
  );
};

export default Header;