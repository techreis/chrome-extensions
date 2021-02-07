/**
 * Remove Banners and Click advertisement skip button when they appear
 */
import { BrandItem, StockSummary, BrandItemExtra } from "./interface";
import { Service, Sectors, NeoMobiDomain } from "./const";

const connection = chrome.runtime.connect({
  name: Service.neoMobiAggregator.name,
});
const execute = async () => {
  window.onload = async () => {
    if (isStockListPage(location.href)) {
      clickMoreBtnUntilNoExist();
      const menu: HTMLElement = document.getElementById("menu")!;
      createToggleBtn(menu, isDevMode());
      if (!isDevMode()) {
        return;
      }
      // change header bg color
      let header: HTMLElement = document.getElementsByTagName("header")[0];
      header.style.backgroundColor = "#ffffcc";
      createStartBtn(menu);
    } else if (isDetailPage(location.href)) {
      isDevMode && sendExtraInfo();
    }
  };
  // event before close
  window.onbeforeunload = () => {
    console.log("window.onbeforeunload");
  };
};

const sendBasicInfo = async () => {
  const brands: HTMLElement[] = Array.from(
    document.querySelectorAll("section.panels") as NodeListOf<HTMLElement>
  );
  const brandItems = getBrandItems(brands);
  console.log(`brand item nums = ${brandItems.length}`);
  // send data to chrome ext background
  for (const item of brandItems) {
    connection.postMessage(item);
    window.open(
      `${NeoMobiDomain}/domestic/stockInfo/brand?securitiesCode=${item.ticker}`
    );
    await sleep(5000);
  }

  const balance: HTMLElement[] = Array.from(
    document.querySelectorAll(
      "section.balance > ul > li > p > span"
    ) as NodeListOf<HTMLElement>
  );
  const totalValuationGainOrLoss: HTMLElement = document.querySelector(
    "section.balance > p > span"
  ) as HTMLElement;
  const stockSummary: StockSummary = {
    type: "summary",
    purchaseCapacity: balance[0].textContent?.trim() || "0",
    totalValuation: balance[1].textContent?.trim() || "0",
    totalValuationGainOrLoss:
      totalValuationGainOrLoss.textContent?.trim() || "0",
  };
  connection.postMessage(stockSummary);
};

const sendExtraInfo = async () => {
  const detailBtn: HTMLElement = document.querySelector(
    "button.showDetail"
  ) as HTMLElement;
  detailBtn.click();
  await sleep(10000);
  const details: HTMLElement[] = Array.from(
    document.querySelectorAll(
      "tr.h-table-border > td > span"
    ) as NodeListOf<HTMLElement>
  );
  const ticker: string =
    document.querySelector("p.ticker")?.textContent?.trim() || "unknown";
  const brandItemExtra: BrandItemExtra = {
    type: "extra",
    ticker,
    buyPrice: details[1].textContent?.trim() || "-", // 買付価格
    sellPrice: details[0].textContent?.trim() || "-", // 売却価格
    expectedDividend: details[2].textContent?.trim() || "-", // 予想配当金
    expectedYield: details[3].textContent?.trim() || "-", // 予想配当利回り
  };
  connection.postMessage(brandItemExtra);
  await sleep(10000);
  window.close();
};

const getBrandItems = (brandElements: HTMLElement[]): BrandItem[] =>
  brandElements.map((brandElement: HTMLElement, index: number) =>
    generateBrandItem(index, brandElement)
  );

const generateBrandItem = (
  index: number,
  brandElement: HTMLElement
): BrandItem => {
  const ticker =
    brandElement.querySelectorAll("p.ticker")[0].textContent?.trim() ||
    "unknown";
  const name =
    brandElement.querySelectorAll("h4.name")[0].textContent?.trim() ||
    "unknown";
  const fup = brandElement.querySelectorAll("span.fUp")[0];
  const fdown = brandElement.querySelectorAll("span.fDown")[0];
  const valuationGainOrLoss = fup
    ? (fup.textContent?.trim() as string)
    : fdown
    ? `-${fdown.textContent?.trim() as string}`
    : "unknown";
  const valuation =
    brandElement
      .querySelectorAll(".price > .value > span")[0]
      .textContent?.trim() || "-1";
  const curPrice =
    brandElement.querySelectorAll("td span")[0].textContent?.trim() || "-1"; // 現在値
  const ownedQuantity: string =
    brandElement.querySelectorAll("td span")[2].textContent?.trim() || "-1"; // 保有数量
  const gainOrLossRate: string =
    brandElement.querySelectorAll("td span")[4].textContent?.trim() || "-1"; // 評価損益率
  const averageAcquisitionUnitPrice: string =
    brandElement.querySelectorAll("td span")[5].textContent?.trim() || "-1"; // 評価損益率
  const brandItem: BrandItem = {
    type: "basic",
    index,
    ticker,
    name,
    valuation: valuation,
    valuationGainOrLoss,
    ownedQuantity: ownedQuantity,
    averageAcquisitionUnitPrice: averageAcquisitionUnitPrice,
    sector: getSectorName(parseInt(ticker)),
    link: `https://trade.sbineomobile.co.jp/domestic/stockInfo/brand?securitiesCode=${ticker}`,
    curPrice: curPrice,
    gainOrLossRate: gainOrLossRate,
    updatedAt: getNowYMD(),
  };
  return brandItem;
};

const getSectorName = (ticker: number) => {
  for (const key in Sectors) {
    if (Sectors[key].members.includes(ticker)) {
      return Sectors[key].name;
    }
  }
  return "不明";
};

const getNowYMD = () => {
  const dt = new Date();
  return `${dt.getFullYear()}/${("00" + (dt.getMonth() + 1)).slice(-2)}/${(
    "00" + dt.getDate()
  ).slice(-2)} ${("00" + dt.getHours).slice(-2)}: ${(
    "00" + dt.getMinutes
  ).slice(-2)}`;
};

const isDetailPage = (href: string) => {
  const regex = /^https:\/\/trade.sbineomobile.co.jp\/domestic\/stockInfo\/brand\?securitiesCode=*/g;
  return regex.test(href);
};

const isStockListPage = (href: string) => {
  const regex = /^https:\/\/trade.sbineomobile.co.jp\/account\/portfolio/g;
  return regex.test(href);
};

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

const createToggleBtn = (menu: HTMLElement, isDevMode: boolean) => {
  let header: HTMLElement = document.getElementsByTagName("header")[0];
  let toggleBtn = document.createElement("button");
  if (isDevMode) {
    toggleBtn.innerHTML = "DEV";
    toggleBtn.style.backgroundColor = "yellow";
  } else {
    toggleBtn.innerHTML = "NORMAL";
  }
  toggleBtn.style.color = "#11365a";
  toggleBtn.style.marginLeft = "25px";
  toggleBtn.style.height = "25px";
  toggleBtn.style.border = "0";
  toggleBtn.style.borderRadius = "34px";
  toggleBtn.onclick = () => {
    const isDevMode = localStorage.getItem("sbiDevMode") ? true : false;
    if (isDevMode) {
      localStorage.removeItem("sbiDevMode");
      toggleBtn.innerHTML = "NORMAL";
      header.style.backgroundColor = "white";
      toggleBtn.style.backgroundColor = "#d3d3d3";
      const startBtn = document.getElementById("startBtn")!;
      menu.removeChild(startBtn);
    } else {
      localStorage.setItem("sbiDevMode", "true");
      header.style.backgroundColor = "#ffffcc";
      toggleBtn.innerHTML = "DEV";
      createStartBtn(menu);
    }
  };
  menu.appendChild(toggleBtn);
};

const clickMoreBtnUntilNoExist = async () => {
  const moreBtns: HTMLElement[] = Array.from(
    document.querySelectorAll("button.more") as NodeListOf<HTMLElement>
  );
  if (moreBtns.length === 0) {
    console.log("There is no more information.");
    return;
  }
  for (const moreBtn of moreBtns) {
    moreBtn.click();
  }
  clickMoreBtnUntilNoExist();
};

const createStartBtn = (menu: HTMLElement) => {
  let startBtn = document.createElement("button");
  startBtn.innerHTML = "START";
  startBtn.setAttribute("id", "startBtn");
  startBtn.style.backgroundColor = "#000094";
  startBtn.style.color = "white";
  startBtn.style.marginRight = "25px";
  startBtn.style.height = "25px";
  startBtn.style.border = "0";
  startBtn.style.borderRadius = "34px";
  startBtn.onclick = () => {
    sendBasicInfo();
  };
  menu.insertAdjacentElement("afterbegin", startBtn);
};

const isDevMode = () => (localStorage.getItem("sbiDevMode") ? true : false);

execute();
