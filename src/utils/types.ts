export interface YearData {
  year: number;
  monthlySalary: number;
  monthlyInvestment: number;
  annualInvestment: number;
  portfolioValue: number;
}

export interface InvestmentAllocationChartProps {
  totalInvested: number;
  investmentProfit: number;
  totalPortfolio: number;
  yearly: YearData[];
  currency: string;
}

export interface CustomLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
}

export interface PortfolioGrowthChartProps {
  data: YearData[];
  currency: string;
  form: {
    stockReturn: number;
    incomeGrowth: number;
    investmentPercent: number;
    monthlyIncome: number;
    period: number;
  };
}

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      color: string;
      icon: string;
      description: string;
    };
  }>;
}

export interface YearData {
  year: number;
  monthlySalary: number;
  monthlyInvestment: number;
  annualInvestment: number;
  portfolioValue: number;
}

export interface SalaryGrowthChartProps {
  data: YearData[];
  currency: string;
  form: {
    incomeGrowth: number;
    investmentPercent: number;
    monthlyIncome: number;
  };
}

export interface TooltipPropsSalary {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number;
  }>;
  label?: string | number;
}

export interface YearlyBreakdownTableProps {
  data: YearData[];
  currency: string;
}