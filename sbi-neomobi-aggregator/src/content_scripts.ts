/**
 * Remove Banners and Click advertisement skip button when they appear
 */
import { BrandItem } from "./interface";
let skipCount = 0;
let removeCount = 0;
let href: string;

const execute = async () => {
  href = location.href;
  window.onload = () => {
    // const header: HTMLElement = document.getElementsByTagName("header")[0];
    // header.style.backgroundColor = "#567855";
    const contents: HTMLElement = document.getElementById(
      "portfolio-layout"
    ) as HTMLElement;
    console.log(contents);
    const brands: HTMLElement[] = Array.from(
      document.querySelectorAll("section.panels") as NodeListOf<HTMLElement>
    );
    getBrandItems(brands);
  };
  // event before close
  window.onbeforeunload = () => {
    console.log("window.onbeforeunload");
  };
};

const getBrandItems = (brandElements: HTMLElement[]): BrandItem[] =>
  brandElements.map((brandElement: HTMLElement) =>
    generateBrandItem(brandElement)
  );

const generateBrandItem = (brandElement: HTMLElement): BrandItem => {
  console.log(brandElement);
  const ticker =
    brandElement.querySelectorAll("p.ticker")[0].textContent?.trim() ||
    "unknown";
  const name =
    brandElement.querySelectorAll("h4.name")[0].textContent?.trim() ||
    "unknown";
  const fup = brandElement.querySelectorAll("span.fUp")[0];
  const fdown = brandElement.querySelectorAll("span.fDown")[0];
  const upDown = fup
    ? (fup.textContent?.trim() as string)
    : fdown
    ? (fdown.textContent?.trim() as string)
    : "unknown";
  const valuation =
    brandElement
      .querySelectorAll(".price > .value > span")[0]
      .textContent?.trim() || "-1";
  console.log(valuation);

  const curPrice =
    brandElement.querySelectorAll("td span")[0].textContent?.trim() || "-1"; // 現在値

  console.log(curPrice);

  const sharesNum: string =
    brandElement.querySelectorAll("td span")[2].textContent?.trim() || "-1"; // 保有数量

  const gainOrLossRate: string =
    brandElement.querySelectorAll("td span")[4].textContent?.trim() || "-1"; // 評価損益率

  const avgUnitPrice: string =
    brandElement.querySelectorAll("td span")[5].textContent?.trim() || "-1"; // 評価損益率

  const brandItem: BrandItem = {
    name,
    ticker,
    valuation: valuation,
    buyPrice: "1000",
    sellPrice: "1000",
    ValuationGainorLoss: upDown,
    expectedDividend: "1000", // 予想配当金
    ExpectedYield: "1000", // 予想配当金
    curPrice: curPrice, // 現)値
    sharesNum: sharesNum,
    gainOrLossRate: gainOrLossRate,
    avgUnitPrice: avgUnitPrice,
    updatedAt: "2020202020",
  };
  console.log(JSON.stringify(brandItem, null, 2));
  return brandItem;
};

// const isMoviePage = (href: string) => {
//   const regex = /^https:\/\/www.youtube.com\/watch\?v=*/g;
//   return regex.test(href);
// };

execute();
