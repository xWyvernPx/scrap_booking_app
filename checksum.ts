import { config } from "dotenv";
config()
interface OverralLink {
    link : string, 
    typeCode : string,
    typeName: string
}
async function importModule() {
    try {
       const links = (await import(`./dist/${process.env.CITY_ID}/links.json`)).default as OverralLink[];
       links.forEach(l =>console.log(l.link)
       )
       
    } catch (error) {
        console.log(error);
        
       console.error('import failed');
    }
 }
 importModule()