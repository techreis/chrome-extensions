/**
 * Remove Banners and Click advertisement skip button when they appear
 */
const execute = async () => {
  let observer: MutationObserver;
  window.onload = () => {
    const target: HTMLElement = document.querySelector(".video-ads.ytp-ad-module") as HTMLElement;
    observer = new MutationObserver(() => {
      // click advertisement skip button
      const btn: HTMLElement = target.querySelector('.ytp-ad-skip-button.ytp-button') as HTMLElement;
      btn && btn.click();
      // remove banner panel
      const banner: HTMLElement = target.querySelector('.ytp-ad-overlay-slot') as HTMLElement;
      banner && banner.remove();
    });
    // observer settings
    const config = { childList: true };
    target && observer.observe(target, config);
    console.log('youtube advertisement remover stanbyed✅.');
  }
  // event before close
  window.onbeforeunload = () => {
    observer.disconnect();
  }
}

execute()
