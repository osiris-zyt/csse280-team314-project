// // TEMP FOR ME (AZZAM):
// const puppeteer = require('puppeteer');
// async function scrapeData(url) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(url);
    
//     const [el] = await page.$x('//*[@id="landingImage"]');
//     const src = await el.getProperty('src');
//     const srcTxt = await src.jsonValue();

//     console.log({srcTxt});
// }
// scrapeData('https://www.amazon.com/gp/product/B07Z8CR6QW?pf_rd_r=81YTZ60A7542EZWZBFRQ&pf_rd_p=edaba0ee-c2fe-4124-9f5d-b31d6b1bfbee');
// // END.



//*[@id="ember787"]/div/div/h5/span[1]/strong


// TEMP FOR ME (AZZAM):
const puppeteer = require('puppeteer');
async function scrapeData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const [el] = await page.$x('//*[@id="ember787"]/div/div/h5/span[1]/strong');
    const src = await el.getProperty('src');
    const srcTxt = await src.jsonValue();

    console.log({srcTxt});
}
scrapeData('https://coronavirus.jhu.edu/map.html');
// END.