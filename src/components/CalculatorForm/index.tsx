import React, { useState } from 'react';

const defaultForm = {
  currency: 'PKR - Pakistani Rupee',
  monthlyIncome: 100000,
  investmentPercent: 5,
  incomeGrowth: 20,
  stockReturn: 15,
  period: 15,
};

const CalculatorForm = ({ onCalculate }: { onCalculate: (form: typeof defaultForm) => void }) => {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'currency' ? value : Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(form);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Responsive Grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            Currency
          </label>
          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl shadow-sm focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 transition-all duration-200 text-slate-900 dark:text-slate-100"
          >
            <option value="PKR - Pakistani Rupee">PKR - Pakistani Rupee</option>
            <option value="USD - US Dollar">USD - US Dollar</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            Current Monthly Income
          </label>
          <input
            type="number"
            name="monthlyIncome"
            value={form.monthlyIncome}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl shadow-sm focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 transition-all duration-200 text-slate-900 dark:text-slate-100"
            placeholder="Enter amount"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            Investment % of Income
          </label>
          <input
            type="number"
            name="investmentPercent"
            value={form.investmentPercent}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl shadow-sm focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 transition-all duration-200 text-slate-900 dark:text-slate-100"
            placeholder="Enter percentage"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            Annual Income Growth (%)
          </label>
          <input
            type="number"
            name="incomeGrowth"
            value={form.incomeGrowth}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl shadow-sm focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 transition-all duration-200 text-slate-900 dark:text-slate-100"
            placeholder="Enter growth rate"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            Expected Annual Stock or Crypto Return (%)
          </label>
          <input
            type="number"
            name="stockReturn"
            value={form.stockReturn}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl shadow-sm focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 transition-all duration-200 text-slate-900 dark:text-slate-100"
            placeholder="Enter return rate"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            Investment Period (Years)
          </label>
          <input
            type="number"
            name="period"
            value={form.period}
            onChange={handleChange}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg sm:rounded-xl shadow-sm focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 dark:focus:ring-emerald-400/20 transition-all duration-200 text-slate-900 dark:text-slate-100"
            placeholder="Enter years"
          />
        </div>
      </div>
      
      {/* Responsive Button */}
      <div className="flex justify-center pt-2 sm:pt-4">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Calculate Wealth
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;