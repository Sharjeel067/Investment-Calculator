import React, { useState } from 'react';
import CalculatorForm from '../CalculatorForm';
import SummaryCards from '../SummaryCards';
import YearlyBreakdownTable from '../YearlyBreakdownTable';
import PortfolioGrowthChart from '../PortfolioGrowthChart';
import InvestmentAllocationChart from '../InvestmentAllocationChart';
import SalaryGrowthChart from '../SalaryGrowthChart';
import { calculateInvestment } from '../../utils/calculateInvestment';

type FormType = {
  currency: string;
  monthlyIncome: string;
  investmentPercent: string;
  incomeGrowth: string;
  stockReturn: string;
  period: string;
};

const defaultForm: FormType = {
  currency: 'PKR - Pakistani Rupee',
  monthlyIncome: '',
  investmentPercent: '',
  incomeGrowth: '',
  stockReturn: '',
  period: '',
};

const InvestmentCalculator = () => {
  const [form, setForm] = useState<FormType>(defaultForm);
  const [result, setResult] = useState(calculateInvestment({
    ...defaultForm,
    monthlyIncome: 100000,
    investmentPercent: 5,
    incomeGrowth: 20,
    stockReturn: 15,
    period: 15,
  }));

  const handleCalculate = (newForm: FormType) => {
    setForm(newForm);
    // Convert all string values to numbers, fallback to 0 if empty
    const parsedForm = {
      ...newForm,
      monthlyIncome: Number(newForm.monthlyIncome) || 0,
      investmentPercent: Number(newForm.investmentPercent) || 0,
      incomeGrowth: Number(newForm.incomeGrowth) || 0,
      stockReturn: Number(newForm.stockReturn) || 0,
      period: Number(newForm.period) || 0,
    };
    setResult(calculateInvestment(parsedForm));
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 mb-3 sm:mb-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
              Investment Growth Calculator
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Calculate your wealth accumulation with growing investment and smart stock or crypto investments
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <CalculatorForm onCalculate={handleCalculate} />
          
          {result && (
            <>
              {/* Total Wealth Display */}
              <div className="text-center py-6 sm:py-8 my-6 sm:my-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl sm:rounded-2xl border border-emerald-200 dark:border-emerald-700 backdrop-blur-sm mx-1">
                <div className="text-slate-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg mb-2 px-4">
                  Your Total Wealth After {form.period} Years
                </div>
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent px-4 break-words">
                  {form.currency.split(' ')[0]} {result.totalPortfolio.toLocaleString()}
                </div>
                <div className="text-slate-500 dark:text-slate-500 text-xs sm:text-sm mt-2 px-4">
                  Congratulations on planning your financial future!
                </div>
              </div>

              {/* Summary Cards */}
              <SummaryCards
                totalInvested={result.totalInvested}
                investmentProfit={result.investmentProfit}
                finalSalary={result.finalSalary}
                finalMonthlyInvestment={result.finalMonthlyInvestment}
                currency={form.currency.split(' ')[0]}
              />

              {/* Charts Section */}
              <div className="space-y-6 sm:space-y-8">
                {/* Portfolio Growth Chart */}
                <PortfolioGrowthChart
                  data={result.yearly}
                  currency={form.currency.split(' ')[0]}
                  form={{
                    stockReturn: Number(form.stockReturn) || 0,
                    incomeGrowth: Number(form.incomeGrowth) || 0,
                    investmentPercent: Number(form.investmentPercent) || 0,
                    monthlyIncome: Number(form.monthlyIncome) || 0,
                    period: Number(form.period) || 0,
                  }}
                />

                {/* Investment Allocation Chart */}
                <InvestmentAllocationChart
                  totalInvested={result.totalInvested}
                  investmentProfit={result.investmentProfit}
                  totalPortfolio={result.totalPortfolio}
                  yearly={result.yearly}
                  currency={form.currency.split(' ')[0]}
                />

                {/* Salary Growth Chart */}
                <SalaryGrowthChart
                  data={result.yearly}
                  currency={form.currency.split(' ')[0]}
                  form={{
                    incomeGrowth: Number(form.incomeGrowth) || 0,
                    investmentPercent: Number(form.investmentPercent) || 0,
                    monthlyIncome: Number(form.monthlyIncome) || 0,
                  }}
                />
              </div>
              
              {/* Yearly Breakdown Table */}
              <YearlyBreakdownTable data={result.yearly} currency={form.currency.split(' ')[0]} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;