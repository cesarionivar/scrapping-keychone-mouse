const puppeteer = require('puppeteer');

const stores = [
  {
    vendor: 'Keychone',
    url: 'https://www.keychron.com/products/keychron-m1-mouse?variant=39505561354329',
    checkStore: async ({ page }) => {
      const textContent = await page.evaluate(
        () => document.querySelector('.payment-buttons').textContent
      );
      return !textContent.includes('Sold out');
    },
  },
];

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const store of stores) {
      const { vendor, url, checkStore } = store;
      await page.goto(url);
      const hasStock = await checkStore({ page });
      console.log(
        hasStock ? `${vendor}: Has stock 😍` : `${vendor}: Doesn't has stock🥲`
      );
    }

    await browser.close();
  } catch (error) {
    console.log('Has occurred an error!');
  }
})();
