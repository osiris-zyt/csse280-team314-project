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



const puppeteer = require('puppeteer');
async function scrapeData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    console.log("-------------START------------");
    // WORLD:
    // COUNTRY
    const [el00] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[1]/td[2]');
    const txt00 = await el00.getProperty('textContent');
    const rawTxt00 = await txt00.jsonValue();
    // Total Cases:
    const [el01] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[1]/td[3]');
    const txt01 = await el01.getProperty('textContent');
    const rawTxt01 = await txt01.jsonValue();
    // Active Cases:
    const [el02] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[1]/td[8]');
    const txt02 = await el02.getProperty('textContent');
    const rawTxt02 = await txt02.jsonValue();
    // console.log({rawTxt00});
    console.log("------------------------------");
    console.log("WORLD");
    console.log("Country: " + rawTxt00);
    console.log("Total Cases: " + rawTxt01);
    console.log("Active Cases: " + rawTxt02);
    console.log("------------------------------");
    // DONE.

    // FIRST COUNTRY:
    // Country:
    const [el20] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[5]/td[2]');
    const txt20 = await el20.getProperty('textContent');
    const rawTxt20 = await txt20.jsonValue();
    // Total Cases:
    const [el21] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[5]/td[3]');
    const txt21 = await el21.getProperty('textContent');
    const rawTxt21 = await txt21.jsonValue();
    // Active Cases:
    const [el22] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[5]/td[8]');
    const txt22 = await el22.getProperty('textContent');
    const rawTxt22 = await txt22.jsonValue();
    console.log("------------------------------");
    console.log("FIRST COUNTRY");
    console.log("Country: " + rawTxt20);
    console.log("Total Cases: " + rawTxt21);
    console.log("Active Cases: " + rawTxt22);
    console.log("------------------------------");
    // DONE.

    // SECOND COUNTRY:
    // Country:
    const [el30] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[7]/td[2]');
    const txt30 = await el30.getProperty('textContent');
    const rawTxt30 = await txt30.jsonValue();
    // Total Cases:
    const [el31] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[7]/td[3]');
    const txt31 = await el31.getProperty('textContent');
    const rawTxt31 = await txt31.jsonValue();
    // Active Cases:
    const [el32] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[7]/td[8]');
    const txt32 = await el32.getProperty('textContent');
    const rawTxt32 = await txt32.jsonValue();
    console.log("------------------------------");
    console.log("SECOND COUNTRY");
    console.log("Country: " + rawTxt30);
    console.log("Total Cases: " + rawTxt31);
    console.log("Active Cases: " + rawTxt32);
    console.log("------------------------------");
    // DONE.

    // THIRD COUNTRY:
    // Country:
    const [el40] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[8]/td[2]');
    const txt40 = await el40.getProperty('textContent');
    const rawTxt40 = await txt40.jsonValue();
    // Total Cases:
    const [el41] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[8]/td[3]');
    const txt41 = await el41.getProperty('textContent');
    const rawTxt41 = await txt41.jsonValue();
    // Active Cases:
    const [el42] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[8]/td[8]');
    const txt42 = await el42.getProperty('textContent');
    const rawTxt42 = await txt42.jsonValue();
    console.log("------------------------------");
    console.log("THIRD COUNTRY");
    console.log("Country: " + rawTxt40);
    console.log("Total Cases: " + rawTxt41);
    console.log("Active Cases: " + rawTxt42);
    console.log("------------------------------");
    // DONE.

    // FOURTH COUNTRY:
    // Country:
    const [el50] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[10]/td[2]');
    const txt50 = await el50.getProperty('textContent');
    const rawTxt50 = await txt50.jsonValue();
    // Total Cases:
    const [el51] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[10]/td[3]');
    const txt51 = await el51.getProperty('textContent');
    const rawTxt51 = await txt51.jsonValue();
    // Active Cases:
    const [el52] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[10]/td[8]');
    const txt52 = await el52.getProperty('textContent');
    const rawTxt52 = await txt52.jsonValue();
    console.log("------------------------------");
    console.log("FOURTH COUNTRY");
    console.log("Country: " + rawTxt50);
    console.log("Total Cases: " + rawTxt51);
    console.log("Active Cases: " + rawTxt52);
    console.log("------------------------------");
    // DONE.

    // FIFTH COUNTRY:
    // Country:
    const [el60] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[11]/td[2]');
    const txt60 = await el60.getProperty('textContent');
    const rawTxt60 = await txt60.jsonValue();
    // Total Cases:
    const [el61] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[11]/td[3]');
    const txt61 = await el61.getProperty('textContent');
    const rawTxt61 = await txt61.jsonValue();
    // Active Cases:
    const [el62] = await page.$x('/html/body/div[3]/div[3]/div/div[4]/div[1]/div/table/tbody[1]/tr[11]/td[8]');
    const txt62 = await el62.getProperty('textContent');
    const rawTxt62 = await txt62.jsonValue();
    console.log("------------------------------");
    console.log("FIFTH COUNTRY");
    console.log("Country: " + rawTxt60);
    console.log("Total Cases: " + rawTxt61);
    console.log("Active Cases: " + rawTxt62);
    console.log("------------------------------");
    // DONE.
    console.log("--------------END-------------");

    browser.close();

}
scrapeData('https://www.worldometers.info/coronavirus/#countries');
// END.