/**
 * Remove Banners and Click advertisement skip button when they appear
 */
let skipCount = 0;
let removeCount = 0;
let href: string;

const execute = async () => {
  href = location.href;
  let observer: MutationObserver;
  let pageChangedObserver: MutationObserver;
  window.onload = () => {
    const targetContent: HTMLElement = document.getElementById('content') as HTMLElement;
    !targetContent && console.log('#content is NOT exist');
    observer = new MutationObserver(() => {
      removeAdvertisement();
    });
    pageChangedObserver = new MutationObserver(()=> {
      if(href === location.href) {
        return;
      }
      href = location.href;
      setTimeout(() => {
        isMoviePage(href) ? setAdObserver(observer) : observer.disconnect();
      }, 3000);
    });
    targetContent && pageChangedObserver.observe(targetContent, { childList: true, subtree: true });
  }
// event before close
  window.onbeforeunload = () => {
    console.log('window.onbeforeunload');
    observer.disconnect();
  }
}

/**
 * set MutationObserver that remove advertisement
 * @param observer
 */
const setAdObserver = async (observer: MutationObserver) => {
  const target: HTMLElement = await document.querySelector(".video-ads.ytp-ad-module") as HTMLElement;
  if (!target) {
    console.log('.video-ads.ytp-ad-module is NOT exist in setAdObserver');
    return;
  }
  observer.observe(target, { childList: true });
  console.log('youtube advertisement remover stanbyed✅.');
}

const isMoviePage = (href: string) => {
  const regex = /^https:\/\/www.youtube.com\/watch\?v=*/g;
  return regex.test(href);
}

/**
 * click advertisement skip button
 * and
 * remove banner panel
 */
const removeAdvertisement = () => {
  const target: HTMLElement = document.querySelector(".video-ads.ytp-ad-module") as HTMLElement;
  if (!target) {
    console.log('.video-ads.ytp-ad-module is NOT exist in removeAdvertisement');
    return;
  }
  clickSkipBtn(target);
  removeBanners(target);
}

/**
 * click advertisement skip button
 * @param target
 */
const clickSkipBtn = (target: HTMLElement) => {
  const btn: HTMLElement = target.querySelector('.ytp-ad-skip-button.ytp-button') as HTMLElement;
  if (!btn) {
    console.log('skip ad failed');
    return;
  }
  btn.click();
  skipCount++;
  console.log(`adskip ${skipCount} times.`);
}

/**
 * remove banner panel
 * @param target
 */
const removeBanners = (target: HTMLElement) => {
  const banner: HTMLElement = target.querySelector('.ytp-ad-overlay-slot') as HTMLElement;
  if (!banner) {
    console.log('remove banner failed');
    return;
  }
  banner.remove();
  removeCount++;
  console.log(`adremove ${removeCount} times.`);
}

execute()
