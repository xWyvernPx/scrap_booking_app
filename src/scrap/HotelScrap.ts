import { Browser, Builder, By, WebDriver } from "selenium-webdriver";
import { Hotel } from "../entities/Hotel";
import { Options } from "selenium-webdriver/edge";
export const HotelScrap = async (address: string) => {
  const ops = new Options();
  ops.windowSize({ width: 1920, height: 1080 });
  let driver = await new Builder()
    .forBrowser(Browser.EDGE)
    .setEdgeOptions(ops)
    .build();
  await driver.get(address);
  const hotel_address = await driver.findElement(
    By.css("div[class='gZwVG S4 H3 f u ERCyA'] span[class='fHvkI PTrfg']")
  );
  const abs = await hotel_address.getText();
  const hotelName = await driver.findElement(By.css("h1#HEADING")).getText();
  const phone_number = await driver
    .findElement(By.css(".zNXea.NXOxh.NjUDn"))
    .getText();
  const url_hotel = await driver
    .findElement(By.css(".YnKZo.Ci.Wc._S.C.pInXB._S.ITocq.jNmfd"))
    .getAttribute("href");
  const url_affilate = await driver
    .findElement(By.css(".YnKZo.Ci.Wc._S.C.pInXB._S.ITocq.NjUDn"))
    .getAttribute("href");
  console.log("ADDRESS = " + abs);

  return new Hotel();
};
