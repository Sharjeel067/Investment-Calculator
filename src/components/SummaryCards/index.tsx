import React from 'react';

const SummaryCards = ({ totalInvested, investmentProfit, finalSalary, finalMonthlyInvestment, currency }: { totalInvested: number; investmentProfit: number; finalSalary: number; finalMonthlyInvestment: number; currency: string }) => {
  const format = (value: number, currency: string) => `${currency} ${value.toLocaleString()}`;
  
  const cards = [
    {
      title: "Total Invested",
      value: format(totalInvested, currency),
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30",
      borderColor: "border-blue-200 dark:border-blue-700"
    },
    {
      title: "Investment Profit",
      value: format(investmentProfit, currency),
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30",
      borderColor: "border-emerald-200 dark:border-emerald-700"
    },
    {
      title: "Final Monthly Salary",
      value: format(finalSalary, currency),
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30",
      borderColor: "border-purple-200 dark:border-purple-700"
    },
    {
      title: "Final Monthly Investment",
      value: format(finalMonthlyInvestment, currency),
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30",
      borderColor: "border-orange-200 dark:border-orange-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 my-4 sm:my-6 lg:my-8">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`bg-gradient-to-br ${card.bgGradient} p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-sm border ${card.borderColor} hover:shadow-md transition-all duration-200 backdrop-blur-sm hover:scale-[1.02] active:scale-[0.98]`}
        >
          {/* <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className={`h-0.5 sm:h-1 flex-1 bg-gradient-to-r ${card.gradient} rounded-full`}></div>
          </div> */}
          <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            {card.title}
          </div>
          <div className="text-sm sm:text-base lg:text-lg font-bold text-slate-800 dark:text-slate-200 break-words">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;