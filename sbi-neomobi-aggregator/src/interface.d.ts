export interface BrandItem {
  // basic
  index: number; // Index
  type: "basic";
  name: string; // 企業名
  ticker: string; // コード
  valuation: string; // 評価額
  valuationGainOrLoss: string; // 評価損益額
  curPrice: string; // 現在値
  ownedQuantity: string; // 保有株数
  gainOrLossRate: string;
  averageAcquisitionUnitPrice: string; // 平均取得単価
  updatedAt: string;
  link: string;
  sector: string;
}

export interface BrandItemExtra {
  type: "extra";
  ticker: string;
  buyPrice: string; // 買付価格
  sellPrice: string; // 売却価格
  expectedDividend: string; // 予想配当金
  expectedYield: string; // 予想配当利回り
}

export interface StockSummary {
  type: "summary";
  purchaseCapacity: string;
  totalValuation: string;
  totalValuationGainOrLoss: string;
}

export interface SectorMaster {
  // 今回はstring
  [key: string]: {
    name: string;
    members: number[];
  };
}
