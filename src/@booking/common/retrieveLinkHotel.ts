import axios from "axios"
import { load } from "cheerio";

export const retrieveHotelLinks = async (listUrl: string) => {
    const res = await axios.get(listUrl);
    const $ = load(res.data);
    const propertyCards = $('div[data-testid="property-card"]');
    var links = []
    // Iterate through each property card to extract the href attribute of a tags
    propertyCards.each((index, element) => {
      const aTag = $(element).find('a'); // Find the 'a' tag within the property card
      const href = aTag.attr('href'); // Get the href attribute of the 'a' tag
      links.push(href);
    });
    return links;
}