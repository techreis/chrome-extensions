import { Service } from "./const";
import { BrandItem, StockSummary, BrandItemExtra } from "./interface";

chrome.runtime.onConnect.addListener((port) => {
  const isNeoMobi = port.name === Service.neoMobiAggregator.name;
  isNeoMobi &&
    port.onMessage.addListener(
      (data: BrandItem | StockSummary | BrandItemExtra) => {
        console.log(JSON.stringify(data, null, 2));
        const xhr = new XMLHttpRequest();
        xhr.open("POST", Service.neoMobiAggregator.endpoint, true);
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(JSON.stringify(data));
      }
    );
});
