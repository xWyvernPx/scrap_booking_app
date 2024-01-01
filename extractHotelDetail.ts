import { config } from "dotenv";
import { scrapeHotel } from "./src/@booking/accommodation/accommodationScrap";
import {createWriteStream, existsSync, mkdirSync} from "fs"
import path from "path";
const { createConnection } = require("typeorm");

config();
interface OverralLink {
    link : string, 
    typeCode : string,
    typeName: string
}
const directory = path.join("dist",process.env.QUERY);
   if (!existsSync(directory)) {
     mkdirSync(directory, { recursive: true });
   }
let ws;

let isFirstWrite = true;
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const scrapData = async () => {
const directory = path.join("dist",process.env.QUERY);
   if (!existsSync(directory)) {
     mkdirSync(directory, { recursive: true });
   }
  try {
    const links = (await import(`./dist/${process.env.QUERY}/links.json`))
      .default as OverralLink[];
      const CHUNKSIZE = Number(process.env.CHUNKSIZE??"5");
      const linkChunks = chunkArray(links, CHUNKSIZE);
      let chunkIndex = 1;
      for (const chunk of linkChunks) {
        
        ws = createWriteStream( path.join(directory, `accommodations_${chunkIndex}.json`), { flags: 'w'})
        ws.on("ready", () => {
          ws.write("[");
        });
        ws.addListener("done",()=>{
          ws.write("]");
          isFirstWrite = true;
        })
        await scrapeWithDelay(chunk);
        ws.emit("done")
        chunkIndex++
      }
  } catch (error) {
    console.log(error);
  } finally {
    // await driver.quit();
  }
};
async function scrapeWithDelay(links) {
  for (const l of links) {
    const accommodation = await scrapeHotel(l.link);
    if (!isFirstWrite) {
      ws.write(",");
    } else {
      isFirstWrite = false;
    }
    ws.write(`${JSON.stringify({...accommodation,typeCode: l.typeCode, typeName: l.typeName })}`)
    console.log({...accommodation,typeCode: l.typeCode, typeName: l.typeName });
    // Introduce a delay of 100ms between each iteration
    await delay(100);
  }
}
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

scrapData();
