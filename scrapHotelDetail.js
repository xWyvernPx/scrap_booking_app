const { DataSource } = require("typeorm");

const { Browser, Builder, By, Key, until } = require("selenium-webdriver");
const { Hotel } = require("./src/entities/Hotel");
export const scrapHotelDetail = async (url) => {
  const dataSource = new DataSource();

  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  await driver.get(url);

  try {
  } catch (error) {
    console.log(error);
  }
};
