interface FormValues {
    currency: string;
    monthlyIncome: number;
    investmentPercent: number;
    incomeGrowth: number;
    stockReturn: number;
    period: number;
  }
  
  export interface YearResult {
    year: number;
    monthlySalary: number;
    monthlyInvestment: number;
    annualInvestment: number;
    portfolioValue: number;
  }
  
  export interface CalculationResult {
    totalInvested: number;
    investmentProfit: number;
    finalSalary: number;
    finalMonthlyInvestment: number;
    totalPortfolio: number;
    yearly: YearResult[];
  }
  
  // Investment calculation utility function with proper compound interest
  export const calculateInvestment = (form: FormValues): CalculationResult => {
    const yearly: YearResult[] = [];
    let totalInvested = 0;
    let portfolioValue = 0;
    
    // Calculate year by year with proper compound interest
    for (let year = 1; year <= form.period; year++) {
      // Calculate salary for this year (grows each year)
      const monthlySalary = form.monthlyIncome * Math.pow(1 + form.incomeGrowth / 100, year - 1);
      
      // Calculate monthly and annual investment for this year
      const monthlyInvestment = (monthlySalary * form.investmentPercent) / 100;
      const annualInvestment = monthlyInvestment * 12;
      
      // Add this year's investment to total
      totalInvested += annualInvestment;
      
      // Apply growth to existing portfolio and add new investment
      // Portfolio grows throughout the year, so we assume investment is added at the beginning
      portfolioValue = (portfolioValue + annualInvestment) * (1 + form.stockReturn / 100);
      
      yearly.push({
        year,
        monthlySalary: Math.round(monthlySalary),
        monthlyInvestment: Math.round(monthlyInvestment),
        annualInvestment: Math.round(annualInvestment),
        portfolioValue: Math.round(portfolioValue)
      });
    }
    
    // Calculate final values
    const finalSalary = form.monthlyIncome * Math.pow(1 + form.incomeGrowth / 100, form.period);
    const finalMonthlyInvestment = (finalSalary * form.investmentPercent) / 100;
    const investmentProfit = portfolioValue - totalInvested;
    
    return {
      totalInvested: Math.round(totalInvested),
      investmentProfit: Math.round(investmentProfit),
      finalSalary: Math.round(finalSalary),
      finalMonthlyInvestment: Math.round(finalMonthlyInvestment),
      totalPortfolio: Math.round(portfolioValue),
      yearly
    };
  };