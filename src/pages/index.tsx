import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InvestmentCalculator from '../components/InvestmentCalculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col transition-colors">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start py-2 sm:py-4 px-2 sm:px-4">
        <InvestmentCalculator />
      </main>
      <Footer />
    </div>
  );
}