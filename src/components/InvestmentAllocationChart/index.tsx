import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { InvestmentAllocationChartProps, TooltipProps } from '../../utils/types';

const InvestmentAllocationChart: React.FC<InvestmentAllocationChartProps> = ({
  totalInvested,
  investmentProfit,
  totalPortfolio,
  yearly,
  currency,
}) => {
  const [view, setView] = useState<'allocation' | 'yearly' | 'risk'>('allocation');

  const formatCurrency = (value: number) => `${currency} ${value.toLocaleString()}`;
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

  // Allocation Data
  const allocationData = [
    {
      name: 'Total Invested',
      value: totalInvested,
      color: '#3b82f6',
      description: 'Your contributions over time'
    },
    {
      name: 'Investment Profit',
      value: investmentProfit,
      color: '#10b981',
      description: 'Compound growth returns'
    },
  ];

  // Yearly Contribution Data (last 5 years or all if less)
  const yearlyContributionData = yearly.slice(-5).map(year => ({
    year: `Year ${year.year}`,
    investment: year.annualInvestment,
    growth: year.portfolioValue - (yearly.slice(0, year.year).reduce((sum, y) => sum + y.annualInvestment, 0)),
  }));

  // Risk Analysis Data
  const riskData = [
    { scenario: 'Bear Market (-20%)', value: totalPortfolio * 0.8, color: '#ef4444' },
    { scenario: 'Recession (-35%)', value: totalPortfolio * 0.65, color: '#f59e0b' },
    { scenario: 'Current Value', value: totalPortfolio, color: '#10b981' },
    { scenario: 'Bull Market (+25%)', value: totalPortfolio * 1.25, color: '#3b82f6' },
    { scenario: 'High Growth (+50%)', value: totalPortfolio * 1.5, color: '#8b5cf6' },
  ];

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl p-3 sm:p-4 shadow-lg text-xs sm:text-sm">
          <div className="flex items-center gap-2 mb-2">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              {data.name}
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-1">
            {data.description}
          </p>
          <p className="font-bold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(data.value)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {formatPercentage(data.value / totalPortfolio)}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (props: {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
  }) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
    
    if (
      cx === undefined ||
      cy === undefined ||
      midAngle === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      percent === undefined
    ) {
      return null;
    }

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs sm:text-sm font-semibold"
      >
        {percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
      </text>
    );
  };

  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            Investment Analysis
          </h3>
        </div>
        
        {/* View Toggle */}
        <div className="flex justify-center sm:justify-end">
          <div className="inline-flex bg-slate-100 dark:bg-slate-700 rounded-lg sm:rounded-xl p-1 gap-1">
            {[
              { key: 'allocation' as const, label: 'Portfolio' },
              { key: 'yearly' as const, label: 'Yearly' },
              { key: 'risk' as const, label: 'Risk' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`
                  px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${view === key 
                    ? 'bg-white dark:bg-slate-600 shadow-sm text-emerald-600 dark:text-emerald-400'
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Chart Section */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-3 sm:p-6">
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              {view === 'allocation' ? (
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              ) : view === 'yearly' ? (
                <BarChart data={yearlyContributionData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs fill-slate-600 dark:fill-slate-400"
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    className="text-xs fill-slate-600 dark:fill-slate-400"
                    tickFormatter={(value) => `${currency} ${(value / 1000).toFixed(0)}K`}
                    width={60}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [formatCurrency(value), name]}
                    labelFormatter={(label) => `Contributions in ${label}`}
                  />
                  <Bar dataKey="investment" fill="#3b82f6" name="Annual Investment" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <BarChart data={riskData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    className="text-xs fill-slate-600 dark:fill-slate-400"
                    tickFormatter={(value) => `${currency} ${(value / 1000).toFixed(0)}K`}
                  />
                  <YAxis 
                    type="category"
                    dataKey="scenario"
                    axisLine={false}
                    tickLine={false}
                    className="text-xs fill-slate-600 dark:fill-slate-400"
                    width={80}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'Portfolio Value']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-3 sm:space-y-4">
          {view === 'allocation' && (
            <>
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  Portfolio Breakdown
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  {allocationData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg sm:rounded-xl">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div 
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="min-w-0">
                          <div className="font-medium text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                            {item.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                          {formatCurrency(item.value)}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {formatPercentage(item.value / totalPortfolio)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl sm:rounded-2xl border border-emerald-200 dark:border-emerald-700 p-4 sm:p-6">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-sm sm:text-base">
                      Investment Efficiency
                    </h4>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <div>Return Multiplier: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{(totalPortfolio / totalInvested).toFixed(2)}x</span></div>
                      <div>Profit Margin: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatPercentage(investmentProfit / totalInvested)}</span></div>
                      <div>Compound Effect: <span className="font-semibold text-emerald-600 dark:text-emerald-400 break-words">{formatCurrency(investmentProfit)}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {view === 'yearly' && (
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                Annual Investment Trend
              </h4>
              <div className="space-y-3">
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Your investment capacity grows with your salary:
                </div>
                {yearlyContributionData.slice(-3).map((year, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                      {year.year}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 break-words">
                      {formatCurrency(year.investment)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === 'risk' && (
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                Risk Assessment
              </h4>
              <div className="space-y-3">
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3">
                  How market conditions could affect your portfolio:
                </div>
                {riskData.map((risk, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 min-w-0 mr-2">
                      {risk.scenario}
                    </span>
                    <span className="text-xs font-bold shrink-0 break-words" style={{ color: risk.color }}>
                      {formatCurrency(risk.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentAllocationChart;