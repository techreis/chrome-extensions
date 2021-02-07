import { SectorMaster } from "./interface";

export const NeoMobiDomain = "https://trade.sbineomobile.co.jp";

export const Service = {
  neoMobiAggregator: {
    name: "sbi-neomobi-aggregator",
    endpoint:
      "https://script.google.com/macros/s/AKfycbysfH1V-G2KaUDsNue2AuEd1rkCOaKsj2Nsg5RpI7NloYKItnp1/exec",
  },
};

export const Sectors: SectorMaster = {
  foods: {
    name: "食品",
    members: [2914],
  },
  banks: {
    name: "銀行",
    members: [8316, 8306],
  },
  otherBanks: {
    name: "その他金融",
    members: [8591, 8593],
  },
  tradingCompany: {
    name: "総合商社",
    members: [8058, 8031, 8001],
  },
  service: {
    name: "サービス",
    members: [2169, 2124, 6087, 4327, 2393],
  },
  pharmaceuticals: {
    name: "医薬品",
    members: [4502],
  },
  chemistry: {
    name: "化学",
    members: [7995],
  },
  insurance: {
    name: "保険",
    members: [8750, 8766],
  },
  telecommunications: {
    name: "情報・通信",
    members: [9437, 9432, 9436, 9433],
  },
  rubber: {
    name: "ゴム",
    members: [5108],
  },
  landTransportation: {
    name: "陸運",
    members: [9142],
  },
};
