export interface BrandItem {
  name: string;
  ticker: string;
  buyPrice: string;
  sellPrice: string;
  valuation: string;
  ValuationGainorLoss: string;
  expectedDividend: string; // 予想配当金
  ExpectedYield: string; // 予想配当金
  curPrice: string; // 現在値
  sharesNum: string;
  gainOrLossRate: string;
  avgUnitPrice: string;
  updatedAt: string;
}
