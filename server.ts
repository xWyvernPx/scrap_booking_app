import { createConnections, DataSource } from "typeorm";

import { Browser, Builder, By, Key, until } from "selenium-webdriver";
import { getGeoCode } from "./src/utils/getGeocode";
import { HotelScrap } from "./src/scrap/HotelScrap";
import { HotelType } from "./entities/HotelType";
import ds from "./datasource";
import { Hotel } from "./entities/Hotel";
import { Location } from "./entities/Location";
import { getRandomType } from "./src/utils/getRandomType";
import { Options } from "selenium-webdriver/chrome";
import { migrateCity } from "./src/@booking/location/cityMigrate";
import { accommodationDetailPage } from "./src/@booking/location/overralAccommodation";
const { createConnection } = require("typeorm");
const url = "https://www.booking.com/country/vn.html";

const scrapData = async () => {
  const ops = new Options();
  ops.windowSize({ width: 1920, height: 1080 });
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await ds.initialize();
    await driver.get(url);
    const cities = await driver
      .findElement(By.xpath("/html/body/div[2]/div/div[4]/div[2]/div/div/ul"))
      .findElements(By.css("li a"));
    const citiesLink = (
      await Promise.all(
        cities.map(async (e) => {
          const persistedCity = await migrateCity(e);
          if (!!persistedCity) {
            return {
              city: persistedCity,
              link: await e.getAttribute("href"),
            };
          }
          return null;
        })
      )
    ).filter((x) => !!x);
    // citiesLink.forEach(async (cl)=> {
    //   await accommodationDetailPage(cl,driver)
    // })
    await accommodationDetailPage(citiesLink[0], driver);
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
