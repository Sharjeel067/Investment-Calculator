import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Line,
} from "recharts";
import { SalaryGrowthChartProps, TooltipPropsSalary } from "../../utils/types";

const SalaryGrowthChart: React.FC<SalaryGrowthChartProps> = ({
  data,
  currency,
  form,
}) => {
  const [view, setView] = useState<"growth" | "purchasing" | "comparison">(
    "growth"
  );

  const formatCurrency = (value: number) =>
    `${currency} ${value.toLocaleString()}`;

  // Calculate purchasing power (assuming 3% inflation)
  const inflationRate = 3;
  const chartData = data.map((year) => {
    const realSalary =
      year.monthlySalary / Math.pow(1 + inflationRate / 100, year.year - 1);
    const realInvestment =
      year.monthlyInvestment / Math.pow(1 + inflationRate / 100, year.year - 1);

    return {
      year: year.year,
      nominalSalary: year.monthlySalary,
      realSalary: Math.round(realSalary),
      monthlyInvestment: year.monthlyInvestment,
      realInvestment: Math.round(realInvestment),
      savingsRate: (year.monthlyInvestment / year.monthlySalary) * 100,
      disposableIncome: year.monthlySalary - year.monthlyInvestment,
    };
  });

  // Comparison with different growth rates
  const comparisonData = data.map((year) => {
    const conservative =
      form.monthlyIncome *
      Math.pow(1 + Math.max(form.incomeGrowth - 10, 0) / 100, year.year - 1);
    const aggressive =
      form.monthlyIncome *
      Math.pow(1 + (form.incomeGrowth + 10) / 100, year.year - 1);

    return {
      year: year.year,
      current: year.monthlySalary,
      conservative: Math.round(conservative),
      aggressive: Math.round(aggressive),
      currentInvestment: year.monthlyInvestment,
      conservativeInvestment: Math.round(
        (conservative * form.investmentPercent) / 100
      ),
      aggressiveInvestment: Math.round(
        (aggressive * form.investmentPercent) / 100
      ),
    };
  });

  const CustomTooltip = ({ active, payload, label }: TooltipPropsSalary) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl p-3 sm:p-4 shadow-lg text-xs sm:text-sm">
          <p className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Year {label}
          </p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-xs sm:text-sm" style={{ color: entry.color }}>
              {entry.name}:{" "}
              {entry.name.includes("Rate")
                ? `${entry.value.toFixed(1)}%`
                : formatCurrency(entry.value)}
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
            Income & Investment Growth
          </h3>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center sm:justify-end">
          <div className="inline-flex bg-slate-100 dark:bg-slate-700 rounded-lg sm:rounded-xl p-1 gap-1">
            {[
              { key: "growth" as const, label: "Growth" },
              { key: "purchasing" as const, label: "Real" },
              { key: "comparison" as const, label: "Compare" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`
                  px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap
                  ${
                    view === key
                      ? "bg-white dark:bg-slate-600 shadow-sm text-emerald-600 dark:text-emerald-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-3 sm:p-6">
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              {view === "growth" ? (
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
                    yAxisId="salary"
                    orientation="left"
                    axisLine={false}
                    tickLine={false}
                    className="text-xs fill-slate-600 dark:fill-slate-400"
                    tickFormatter={(value) =>
                      `${currency} ${(value / 1000).toFixed(0)}K`
                    }
                    width={60}
                  />
                  <YAxis
                    yAxisId="rate"
                    orientation="right"
                    axisLine={false}
                    tickLine={false}
                    className="text-xs fill-slate-600 dark:fill-slate-400"
                    tickFormatter={(value) => `${value.toFixed(0)}%`}
                    width={50}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />

                  <Area
                    yAxisId="salary"
                    type="monotone"
                    dataKey="nominalSalary"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="rgba(59, 130, 246, 0.3)"
                    name="Monthly Salary"
                  />
                  <Area
                    yAxisId="salary"
                    type="monotone"
                    dataKey="monthlyInvestment"
                    stackId="2"
                    stroke="#10b981"
                    fill="rgba(16, 185, 129, 0.3)"
                    name="Monthly Investment"
                  />
                  <Line
                    yAxisId="rate"
                    type="monotone"
                    dataKey="savingsRate"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ fill: "#f59e0b", r: 2 }}
                    name="Savings Rate (%)"
                  />
                </ComposedChart>
              ) : view === "purchasing" ? (
                <AreaChart data={chartData}>
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
                    tickFormatter={(value) =>
                      `${currency} ${(value / 1000).toFixed(0)}K`
                    }
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />

                  <Area
                    type="monotone"
                    dataKey="nominalSalary"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="rgba(59, 130, 246, 0.3)"
                    name="Nominal Salary"
                  />
                  <Area
                    type="monotone"
                    dataKey="realSalary"
                    stackId="2"
                    stroke="#ef4444"
                    fill="rgba(239, 68, 68, 0.3)"
                    name="Real Salary (Inflation Adjusted)"
                  />
                </AreaChart>
              ) : (
                <ComposedChart data={comparisonData}>
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
                    tickFormatter={(value) =>
                      `${currency} ${(value / 1000).toFixed(0)}K`
                    }
                    width={60}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />

                  <Area
                    type="monotone"
                    dataKey="conservative"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="rgba(245, 158, 11, 0.2)"
                    name="Conservative Growth"
                  />
                  <Area
                    type="monotone"
                    dataKey="current"
                    stackId="2"
                    stroke="#10b981"
                    fill="rgba(16, 185, 129, 0.2)"
                    name="Current Growth"
                  />
                  <Area
                    type="monotone"
                    dataKey="aggressive"
                    stackId="3"
                    stroke="#3b82f6"
                    fill="rgba(59, 130, 246, 0.2)"
                    name="Aggressive Growth"
                  />
                </ComposedChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-3 sm:space-y-4">
          {/* Key Metrics Card */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              Key Metrics
            </h4>
            <div className="space-y-2 sm:space-y-3">
              {[
                {
                  label: "Starting Salary",
                  value: formatCurrency(form.monthlyIncome),
                  icon: "🟢",
                },
                {
                  label: "Final Salary",
                  value: formatCurrency(
                    chartData[chartData.length - 1]?.nominalSalary || 0
                  ),
                  icon: "🎯",
                },
                {
                  label: "Growth Rate",
                  value: `${form.incomeGrowth}% annually`,
                  icon: "📈",
                },
                {
                  label: "Investment Rate",
                  value: `${form.investmentPercent}% of income`,
                  icon: "💰",
                },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 sm:p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg sm:rounded-xl"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="text-xs sm:text-sm">{metric.label}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 shrink-0 break-words">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Analysis */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl sm:rounded-2xl border border-blue-200 dark:border-blue-700 p-4 sm:p-6">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
              Growth Impact
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <div>
                Salary multiplies by{" "}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {(
                    (chartData[chartData.length - 1]?.nominalSalary || 0) /
                    form.monthlyIncome
                  ).toFixed(1)}
                  x
                </span>{" "}
                over {data.length} years
              </div>
              <div className="break-words">
                Investment capacity grows from{" "}
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(
                    (form.monthlyIncome * form.investmentPercent) / 100
                  )}
                </span>{" "}
                to{" "}
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  {formatCurrency(
                    chartData[chartData.length - 1]?.monthlyInvestment || 0
                  )}
                </span>
              </div>
              <div>
                Consistent savings rate maintains{" "}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {form.investmentPercent}%
                </span>{" "}
                discipline
              </div>
            </div>
          </div>

          {/* Inflation Impact (only for purchasing power view) */}
          {view === "purchasing" && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl sm:rounded-2xl border border-orange-200 dark:border-orange-700 p-4 sm:p-6">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                Inflation Impact
              </h4>
              <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <div>Assuming {inflationRate}% annual inflation</div>
                <div className="break-words">
                  Real purchasing power in final year:{" "}
                  <span className="font-bold text-orange-600 dark:text-orange-400">
                    {formatCurrency(
                      chartData[chartData.length - 1]?.realSalary || 0
                    )}
                  </span>
                </div>
                <div>
                  Inflation reduces value by{" "}
                  <span className="font-bold text-red-600 dark:text-red-400">
                    {(
                      (((chartData[chartData.length - 1]?.nominalSalary || 0) -
                        (chartData[chartData.length - 1]?.realSalary || 0)) /
                        (chartData[chartData.length - 1]?.nominalSalary || 1)) *
                      100
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaryGrowthChart;