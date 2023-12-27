import axios from "axios";
import { load } from "cheerio";

export const getMaxProps = async (url : string) => {
    const res = await axios.get(url);
    const $ = load(res.data);
    const resultCount = $('.efdb2b543b.e4b7a69a57 h1').text();
    
 
    return extractNumberFromString(resultCount);
}
export function extractNumberFromString(inputString) {
    const regex = /\d{1,3}(,\d{3})*(\.\d+)?/g;
    const match = inputString.match(regex);
  
    if (match && match.length > 0) {
      const number = match[0].replace(/,/g, '');
      return parseInt(number, 10);
    }
  
    return null;
  }