import { createConnections, DataSource } from "typeorm";
import { HotelType } from "./src/entities/HotelType";
import { Hotel } from "./src/entities/Hotel";

import { Browser, Builder, By, Key, until } from "selenium-webdriver";
import { getGeoCode } from "./src/utils/getGeocode";
import { HotelScrap } from "./src/scrap/HotelScrap";
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
  // try {
  //   const { data } = await axios.get(url);

  //   // const $ = cheerio.load(data);
  //   const {
  //     window: { document },
  //   } = new JSDOM(data);
  //   const $ = document.querySelector.bind(document);
  //   const $$ = document.querySelectorAll.bind(document);
  //   const nextButton = $$(".ui_pagination .nav.next");
  //   $(
  //     "#taplc_hsx_hotel_list_lite_dusty_hotels_combined_sponsored_undated_0"
  //   ).onchange = () => {
  //     console.log("list change");
  //   };
  //   const listTitle = $$(".listing_title");
  //   // const nextButton = $(".ui_pagination .nav.next");
  //   // console.log($(nextButton.get(1)));
  //   listTitle.forEach((el) => {
  //     // console.log($(el).children("a").text());
  //     console.log(el.textContent);
  //   });
  //   const listTitle2 = $$(".listing_title");
  //   document.onchange = () => {
  //     console.log("change");
  //   };
  //   // listTitle2.forEach((el) => {
  //   //   console.log(el.textContent);
  //   // });
  // } catch (error) {
  //   console.log(error);
  // }
  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  try {
    await driver.get(url);
    const nextButton = await driver.findElement(
      By.css("span.nav.next.ui_button.primary")
    );
    const listHotel = await driver.findElements({ css: ".listing_title a" });
    // listHotel.forEach((el, i) => {
    //   el.getAttribute("href")
    //     .then(async (text) => {
    //       await HotelScrap(text);
    //     })
    //     .catch((error) => console.log(error));
    // });
    const text = await listHotel[0].getAttribute("href");
    await HotelScrap(text);
  } catch (error) {
    console.log(error);
  } finally {
    // await driver.quit();
  }
};

scrapData();
