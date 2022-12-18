import { Browser, Builder, By } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import { HotelScrap } from "./src/scrap/HotelScrap";
import { initData } from "./src/utils/initData";
import { initDefaultPhotoType } from "./src/utils/initDefaultPhotoType";
import { initLogger } from "./src/utils/logger";
import { info, error } from "winston";
const { createConnection } = require("typeorm");
// request("https://123job.vn/tuyen-dung", (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);

//     $(".job__list-item").each((index, el) => {
//       const job = $(el).find(".job__list-item-title a").text(); // lấy tên job
//       const company = $(el).find(".job__list-item-company span").text(); // lấy tên công ty
//       const address = $(el)
//         .find(".job__list-item-info")
//         .find(".address")
//         .text(); // lấy địa chỉ
//       const salary = $(el).find(".job__list-item-info").find(".salary").text(); // lấy lương

//       console.log(job, company, address, salary);
//     });
//   } else {
//     console.log(error);
//   }
// });
const url = "https://www.tripadvisor.com/Hotels-g293921-Vietnam-Hotels.html";
initLogger();
const scrapData = async () => {
  const ops = new Options();
  ops.windowSize({ width: 1920, height: 1080 });
  let driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(ops)
    .build();

  try {
    await driver.get(url);
    let page = 1;
    await initData();
    await initDefaultPhotoType();
    while (true) {
      const nextButton = await driver.findElement(
        By.css("span.nav.next.ui_button.primary")
      );
      const listHotel = await driver.findElements({ css: ".listing_title a" });
      // await driver.switchTo().newWindow("tab");
      const urls = await Promise.all(
        listHotel.map(async (el) => await el.getAttribute("href"))
      );
      for await (const url of urls) {
        info("SCRAPPING HOTEL : " + url);
        await HotelScrap(url);
      }
      // console.log(urls);
      if (page === 1) {
        const seeAllButton = await driver.findElement(
          By.css("#component_6 div button")
        );
        await seeAllButton.click();
      }
      await nextButton.click();
      await driver.sleep(3000);
      page++;
    }
  } catch (e) {
    error("ERROR - Server.ts - Error: " + e);
  } finally {
    // await driver.quit();
  }
};

scrapData();
