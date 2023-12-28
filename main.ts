import { config } from "dotenv";
import { scrapeHotel } from "./src/@booking/accommodation/accommodationScrap";
import {createWriteStream} from "fs"
const { createConnection } = require("typeorm");

config();
interface OverralLink {
    link : string, 
    typeCode : string,
    typeName: string
}
const scrapData = async () => {
    const ws = createWriteStream("test.json", { flags: 'w'})
//   const ops = new Options();
//   ops.windowSize({ width: 1920, height: 1080 });
//   let driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    const links = (await import(`./dist/${process.env.CITY_ID}/links.json`))
      .default as OverralLink[];
 const hotels = await Promise.all(  links.map(async(l)=>{
        const accommodation = await scrapeHotel(l.link)
        // console.log(accommodation);
        return accommodation
    }))
    ws.write(`${JSON.stringify(hotels)}`)
  } catch (error) {
    console.log(error);
  } finally {
    // await driver.quit();
    ws.close()
  }
};
scrapData();
