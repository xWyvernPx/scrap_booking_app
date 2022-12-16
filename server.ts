import { createConnections, DataSource } from "typeorm";

import { Browser, Builder, By, Key, until } from "selenium-webdriver";
import { getGeoCode } from "./src/utils/getGeocode";
import { HotelScrap } from "./src/scrap/HotelScrap";
import { HotelType } from "./entities/HotelType";
import ds from "./datasource";
import { Hotel } from "./entities/Hotel";
import { Location } from "./entities/Location";
import { getRandomType } from "./src/utils/getRandomType";
import { Options } from "selenium-webdriver/firefox";
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

const scrapData = async () => {
  const ops = new Options();
  ops.windowSize({ width: 1920, height: 1080 });
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {
    await driver.get(url);
    const nextButton = await driver.findElement(
      By.css("span.nav.next.ui_button.primary")
    );

    const seeAllButton = await driver.findElement(
      By.css("button[class='rmyCe _G B- z _S c Wc wSSLS pexOo sOtnj']")
    );
    await seeAllButton.click();
    while (true) {
      const listHotel = await driver.findElements({ css: ".listing_title a" });
      // await driver.switchTo().newWindow("tab");
      const urls = await Promise.all(
        listHotel.map(async (el) => await el.getAttribute("href"))
      );
      // for await (const url of urls) {
      //   await HotelScrap(url);
      // }
      console.log(urls);
      await nextButton.click();
      await driver.sleep(3000);
    }

    // const text = await listHotel[0].getAttribute("href");
    // await HotelScrap(
    //   "https://www.tripadvisor.com/Hotel_Review-g1236104-d21200441-Reviews-Pu_Luong_Riverside_Lodge-Thanh_Hoa_Thanh_Hoa_Province.html",
    //   driver
    // );
  } catch (error) {
    console.log(error);
  } finally {
    // await driver.quit();
  }
};

scrapData();
