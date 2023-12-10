interface Portfolio {
    total_investment: number;
    total_deposit: number;
    total_profit: number;
    last_update: string;
  }
  
  // interface StockPurchased {
  //   stockId: string;
  //   stockName: string;
  //   totalPurchasedPrice: number;
  // }
  
  interface InvestmentGrowth {
    month: string;
    growth: number;
  }
  
  export interface UserPortfolio {
    portfolio: Portfolio;
    // stockAllocation: StockPurchased[];
    investmentGrowth: InvestmentGrowth[];
  }