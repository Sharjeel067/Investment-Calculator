import React from 'react';
import { YearlyBreakdownTableProps } from '../../utils/types';

const format = (value: number, currency: string) =>
  `${currency} ${value.toLocaleString()}`;

const YearlyBreakdownTable: React.FC<YearlyBreakdownTableProps> = ({ data, currency }) => {
  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-1">
        <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
          Year-by-Year Breakdown
        </h3>
      </div>
      
      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Mobile Card View */}
        <div className="block lg:hidden">
          <div className="space-y-3 sm:space-y-4 p-3 sm:p-4">
            {data.map((row) => (
              <div 
                key={row.year} 
                className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700/50 dark:to-blue-900/20 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-600 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    Year {row.year}
                  </span>
                  <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full whitespace-nowrap">
                    Portfolio: {format(row.portfolioValue, currency)}
                  </span>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <span className="text-slate-500 dark:text-slate-400 block">Monthly Salary</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 break-words">
                      {format(row.monthlySalary, currency)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 dark:text-slate-400 block">Monthly Investment</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 break-words">
                      {format(row.monthlyInvestment, currency)}
                    </span>
                  </div>
                  <div className="space-y-1 xs:col-span-2">
                    <span className="text-slate-500 dark:text-slate-400 block">Annual Investment</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400 break-words">
                      {format(row.annualInvestment, currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-b border-slate-200 dark:border-slate-600">
                <th className="text-left py-4 px-4 xl:px-6 font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="hidden xl:inline">Year</span>
                  </div>
                </th>
                <th className="text-left py-4 px-4 xl:px-6 font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="hidden xl:inline">Monthly Salary</span>
                    <span className="xl:hidden">Salary</span>
                  </div>
                </th>
                <th className="text-left py-4 px-4 xl:px-6 font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="hidden xl:inline">Monthly Investment</span>
                    <span className="xl:hidden">Monthly Inv.</span>
                  </div>
                </th>
                <th className="text-left py-4 px-4 xl:px-6 font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="hidden xl:inline">Annual Investment</span>
                    <span className="xl:hidden">Annual Inv.</span>
                  </div>
                </th>
                <th className="text-left py-4 px-4 xl:px-6 font-semibold text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="hidden xl:inline">Portfolio Value</span>
                    <span className="xl:hidden">Portfolio</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr 
                  key={row.year} 
                  className={`
                    border-b border-slate-100 dark:border-slate-700 last:border-b-0
                    hover:bg-gradient-to-r hover:from-slate-50/50 hover:to-blue-50/50 
                    dark:hover:from-slate-700/30 dark:hover:to-blue-900/10
                    transition-all duration-200 group
                    ${idx % 2 === 0 ? 'bg-white/50 dark:bg-slate-800/50' : 'bg-slate-50/50 dark:bg-slate-700/30'}
                  `}
                >
                  <td className="py-3 lg:py-4 px-4 xl:px-6">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xs lg:text-sm shrink-0">
                        {row.year}
                      </div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm lg:text-base hidden xl:inline">
                        Year {row.year}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 lg:py-4 px-4 xl:px-6 text-slate-700 dark:text-slate-300 font-medium text-xs lg:text-sm xl:text-base">
                    <div className="break-words">{format(row.monthlySalary, currency)}</div>
                  </td>
                  <td className="py-3 lg:py-4 px-4 xl:px-6 text-slate-700 dark:text-slate-300 font-medium text-xs lg:text-sm xl:text-base">
                    <div className="break-words">{format(row.monthlyInvestment, currency)}</div>
                  </td>
                  <td className="py-3 lg:py-4 px-4 xl:px-6">
                    <span className="inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 break-words">
                      {format(row.annualInvestment, currency)}
                    </span>
                  </td>
                  <td className="py-3 lg:py-4 px-4 xl:px-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm lg:text-base xl:text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent break-words">
                        {format(row.portfolioValue, currency)}
                      </span>
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shrink-0"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-t border-slate-200 dark:border-slate-700 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                  Investment Journey Summary
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {data.length} years of consistent wealth building
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="text-center sm:text-right">
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Final Portfolio</div>
                <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent break-words">
                  {data.length > 0 ? format(data[data.length - 1].portfolioValue, currency) : ''}
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Total Years</div>
                <div className="text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-300">
                  {data.length} Years
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlyBreakdownTable;