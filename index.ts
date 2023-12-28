import { config } from "dotenv";
import fs from "fs";
import {
  Browser,
  Builder,
  By,
  until,
  WebDriver,
  WebElement,
} from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import { retrieveHotelLinks } from "./src/@booking/common/retrieveLinkHotel";
import category from "./config/propType.json";
import { getMaxProps } from "./src/@booking/common/utils";
import { stringify } from "querystring";
const { createConnection } = require("typeorm");
import path from "path";
config();
const url =
  "https://www.booking.com/searchresults.html?aid=304142&label=gen173nr-1FCAIo9AFCAnZuSDNYBGj0AYgBAZgBMbgBF8gBDNgBAegBAfgBAogCAagCA7gCnr6wrAbAAgHSAiQzZWNkNjc2Yi1jMTc1LTRkMGItYTYxZi00YTg1N2ZlNmUyMDfYAgXgAgE&sid=fdf81d1e3bed80d1478b475c52c48ade&checkin=2024-03-01&checkout=2024-03-02&city=" +
  process.env.CITY_ID;

const scrapData = async () => {
  const ops = new Options();
  ops.windowSize({ width: 1920, height: 1080 });
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  const directory = path.join("dist",process.env.CITY_ID);
   if (!fs.existsSync(directory)) {
     fs.mkdirSync(directory, { recursive: true });
   }
   const writeStream = fs.createWriteStream(
     path.join(directory, `links.json`),
     { flags: "w" }
   );
   writeStream.on("ready", () => {
    writeStream.write("[");
  });
  writeStream.addListener("done",()=>{
    writeStream.write("]");
  })
  try {
    await driver.get(url);
    await driver.sleep(5000);
    await disableAd(driver);

    const accommodationTypes = await propertyTypeRetrieve(driver);
    
    let isFirstWrite = true;
   const tasks =  accommodationTypes.map(async (type) => {
      const typeName = Object.keys(category).find(k => category[k] === type)

      const PAGE_SIZE = 25;
      var offset = 0;
      const params = {
        offset,
        nflt: `ht_id%3D${type}`,
      };
      const maxProps = await getMaxProps(`${url}&${stringify(params)}`);
      console.log(`TYPE : ${typeName}, " MAX : ${maxProps}, \n url : ${url}&${stringify(params)} `);
      
     
      
      
     
      while (offset <= maxProps) {
        const links = await retrieveHotelLinks(`${url}&${stringify(params)}`);
        links.forEach((l) => {
          if (!isFirstWrite) {
            writeStream.write(",");
          } else {
            isFirstWrite = false;
          }
          writeStream.write(`${JSON.stringify({
            link: l,
            typeCode: type,
            typeName
          })}\n`);
        });
        console.log(links);

        offset += PAGE_SIZE;
      }
      
    });
    await Promise.all(tasks)
  } catch (error) {
    console.log(error);
  } finally {
    writeStream.emit("done");
    await driver.quit();
  }
};
export const propertyTypeRetrieve = async (driver: WebDriver) => {
  const element = await driver.wait(
    until.elementLocated(By.xpath(`//*[contains(text(), 'Property Type')]`)),
    10000
  );

  // Find the parent container div of the element
  const containerDiv = (await driver.executeScript(
    "return arguments[0].parentNode.parentNode;", // Retrieve the parent node
    element
  )) as WebElement;
  const button = await containerDiv.findElement(
    By.css(`button.a83ed08757.f88a5204c2.a16392a689.b98133fb50`)
  );

  // Click the button
  await button.click();

  const accommodationTypeEles = await containerDiv.findElements(
    By.xpath(".//div[@data-filters-item]")
  );
  const accommodationTypes = (
    await Promise.all(
      accommodationTypeEles.map(async (e) => {
        const typeText = await e
          .findElement(By.xpath(".//label/span[3]/div/div/div"))
          .getText();
        return category[typeText] ? category[typeText] : null;
      })
    )
  ).filter((x) => x !== null);
  return accommodationTypes;
};
export const disableAd = async (driver: WebDriver) => {
    try {
        
        const element = await driver.findElement(By.css(process.env.AD_CSS_SELECT));
        element.findElement(By.css("button")).click();
    } catch (error) {
        
    }
};
scrapData();
