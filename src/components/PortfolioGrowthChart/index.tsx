import React, { useState } from 'react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  ComposedChart,
} from 'recharts';
import { PortfolioGrowthChartProps, TooltipPropsSalary } from '../../utils/types';

const PortfolioGrowthChart: React.FC<PortfolioGrowthChartProps> = ({ data, currency, form }) => {
  const [scenario, setScenario] = useState<'base' | 'conservative' | 'optimistic'>('base');

  // Generate scenario data
  const generateScenarioData = (returnRate: number) => {
    let portfolioValue = 0;
    let totalInvested = 0;
    
    return data.map((year) => {
      totalInvested += year.annualInvestment;
      portfolioValue = (portfolioValue + year.annualInvestment) * (1 + returnRate / 100);
      
      return {
        year: year.year,
        portfolioValue: Math.round(portfolioValue),
        totalInvested: Math.round(totalInvested),
        profit: Math.round(portfolioValue - totalInvested),
      };
    });
  };

  const baseData = generateScenarioData(form.stockReturn);
  const conservativeData = generateScenarioData(Math.max(form.stockReturn - 5, 3));
  const optimisticData = generateScenarioData(form.stockReturn + 5);

  const chartData = data.map((item, index) => ({
    year: item.year,
    base: baseData[index]?.portfolioValue || 0,
    conservative: conservativeData[index]?.portfolioValue || 0,
    optimistic: optimisticData[index]?.portfolioValue || 0,
    invested: baseData[index]?.totalInvested || 0,
  }));

  const formatCurrency = (value: number) => `${currency} ${value.toLocaleString()}`;

  const CustomTooltip = ({ active, payload, label }: TooltipPropsSalary) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl p-3 sm:p-4 shadow-lg text-xs sm:text-sm">
          <p className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Year {label}
          </p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-xs sm:text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            Portfolio Growth Projection
          </h3>
        </div>
        
        {/* Scenario Toggle */}
        <div className="flex justify-center sm:justify-end">
          <div className="inline-flex bg-slate-100 dark:bg-slate-700 rounded-lg sm:rounded-xl p-1 gap-1">
            {[
              { key: 'conservative' as const, label: 'Conservative', color: 'text-orange-600 dark:text-orange-400' },
              { key: 'base' as const, label: 'Base', color: 'text-emerald-600 dark:text-emerald-400' },
              { key: 'optimistic' as const, label: 'Optimistic', color: 'text-blue-600 dark:text-blue-400' },
            ].map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => setScenario(key)}
                className={`
                  px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${scenario === key 
                    ? 'bg-white dark:bg-slate-600 shadow-sm ' + color
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-3 sm:p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {[
            { 
              label: 'Final Portfolio', 
              value: chartData[chartData.length - 1]?.[scenario] || 0,
              color: 'text-emerald-600 dark:text-emerald-400'
            },
            { 
              label: 'Total Invested', 
              value: chartData[chartData.length - 1]?.invested || 0,
              color: 'text-blue-600 dark:text-blue-400'
            },
            { 
              label: 'Total Profit', 
              value: (chartData[chartData.length - 1]?.[scenario] || 0) - (chartData[chartData.length - 1]?.invested || 0),
              color: 'text-purple-600 dark:text-purple-400'
            },
            { 
              label: 'Return Rate', 
              value: scenario === 'conservative' ? form.stockReturn - 5 : scenario === 'optimistic' ? form.stockReturn + 5 : form.stockReturn,
              color: 'text-orange-600 dark:text-orange-400',
              isPercentage: true
            },
          ].map((metric, index) => (
            <div key={index} className="text-center p-2 sm:p-3 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 leading-tight">
                {metric.label}
              </div>
              <div className={`font-bold text-xs sm:text-sm ${metric.color} break-words`}>
                {metric.isPercentage ? `${metric.value}%` : formatCurrency(metric.value)}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                className="text-xs fill-slate-600 dark:fill-slate-400"
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs fill-slate-600 dark:fill-slate-400"
                tickFormatter={(value: number) => `${currency} ${(value / 1000).toFixed(0)}K`}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              
              {/* Total Invested Area */}
              <Area
                type="monotone"
                dataKey="invested"
                fill="rgba(59, 130, 246, 0.1)"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth={1}
                name="Total Invested"
              />
              
              {/* Portfolio Growth Lines */}
              <Line
                type="monotone"
                dataKey="conservative"
                stroke="#f59e0b"
                strokeWidth={scenario === 'conservative' ? 3 : 1}
                opacity={scenario === 'conservative' ? 1 : 0.4}
                dot={scenario === 'conservative' ? { r: 3 } : false}
                name="Conservative"
              />
              <Line
                type="monotone"
                dataKey="base"
                stroke="#10b981"
                strokeWidth={scenario === 'base' ? 3 : 1}
                opacity={scenario === 'base' ? 1 : 0.4}
                dot={scenario === 'base' ? { r: 3 } : false}
                name="Base Case"
              />
              <Line
                type="monotone"
                dataKey="optimistic"
                stroke="#3b82f6"
                strokeWidth={scenario === 'optimistic' ? 3 : 1}
                opacity={scenario === 'optimistic' ? 1 : 0.4}
                dot={scenario === 'optimistic' ? { r: 3 } : false}
                name="Optimistic"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Insights */}
        <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg sm:rounded-xl border border-emerald-200 dark:border-emerald-700">
          <div className="flex items-start gap-2 sm:gap-3">
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">
                Key Insights
              </h4>
              <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>The power of compound interest accelerates wealth growth over time</li>
                <li>Even a 5% difference in returns significantly impacts final portfolio value</li>
                <li>Consistent investments early create dramatic long-term results</li>
                <li>Market volatility is smoothed over longer investment periods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioGrowthChart;