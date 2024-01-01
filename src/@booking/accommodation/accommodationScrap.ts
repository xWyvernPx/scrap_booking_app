import axios from "axios";
import { load } from "cheerio";
import { createWriteStream } from "fs";
import { launch } from "puppeteer";
import { extractNumberFromString } from "../common/utils";

const IMAGE_LIMIT = 20
function parseHotel(html) {
  const $ = load(html);

  const latLng = $(".show_map_hp_link").attr("data-atlas-latlng").split(",");
  const lat = latLng[0];
  const lng = latLng[1];

  const facilities = [];
  $(
    '[data-capla-component-boundary="b-property-web-property-page/PropertyMostPopularFacilities"] > div > div > ul > li'
  ).each((index, feat_box) => {
    const icon = $(feat_box).find(" div > div > span").html();
    const feats = $(feat_box)
      .find(" div > div > div > span > div > span")
      .text()
      .trim();
    facilities.splice(facilities.length, 0, {
      icon,
      name: feats,
    });
  });

  const features = {};
  $(
    '[data-testid="property-section--content"] > .e50d7535fa > div  > div '
  ).each((index, feat_box) => {
    const typeIcon = $(feat_box).find(" div > div > div > span").html();
    const feats = $(feat_box)
      .find("ul > li")
      .map((i, e) => ({
        icon: $(e).find("div > div > span").html(),
        name: $(e).find("div > div > div > span > div >span").text().trim(),
        additional_charge:
          $(e).find(".abf093bdfe.c147fc6dd1.d9a5b87e39.b81491d8c4")?.text() ===
            "Additional charge" ?? false,
      }))
      .toArray();
    const type = $(feat_box).find(" div > div > .d1ca9115fe").text().trim();
    const note = $(feat_box)
      .find(".a53cbfa6de.f45d8e4c32.df64fda51b")
      .text()
      .trim();
    features[type] = {
      icon: typeIcon,
      features: feats,
      note,
    };
  });

  const rooms = [];

  $("#hprt-table > tbody > tr").each((index, element) => {
    const name = $(element).find(".hprt-roomtype-link").text().trim();
    const roomType = $(element)
      .find(".hprt-roomtype-link")
      .attr("data-room-id");
    const basePrice = extractNumberFromString(
      $(element).find(".bui-price-display__value").text()
    );
    const description = $(element).find(".hprt-roomtype-bed").html();
    const noGuests = $(element).find(".c-occupancy-icons__adults > i").length;

    rooms.push({
      name,
      roomType,
      basePrice,
      description,
      noGuests,
    });
  });

  const data = {
    title: $(
      'div[data-capla-component-boundary="b-property-web-property-page/PropertyHeaderName"] > h2'
    )
      .text()
      .trim(),
    description: $("div#property_description_content")
      .text()
      .trim()
      .replace(/\n/g, ""),
    address: $(".hp_address_subtitle").text().trim(),
    lat: lat,
    lng: lng,
    facilities: facilities,
    id: html.match(/b_hotel_id:\s*'(.+?)'/)[1],
    url: "",
    features,
    rooms,
  };

  return data;
}

async function fetchHotel(url) {
  const resp = await axios.get(url);
  const hotel = parseHotel(resp.data);
  // const hotel = {url:''};
  hotel.url = resp.config.url;
  hotel["images"] = await scrapImage(url);
  // hotel['rooms'] = await scrapRoom(url)
  return hotel;
}
export async function scrapeHotels(urls: string[]) {
  const hotels = await Promise.all(urls.map((url) => fetchHotel(url)));
  return hotels;
}
export async function scrapeHotel(url: string) {
  const hotel = await fetchHotel(url);
  return hotel;
}

async function scrapImage(hotelUrl: string) {
  const browser = await launch({ headless: false });
  try {
    const hotelUrlWithImages = hotelUrl.replace(
      "#hotelTmpl",
      "&activeTab=photosGallery"
    );
    const page = await browser.newPage();
    await page.goto(hotelUrlWithImages);
    await page.waitForSelector(".bh-photo-modal-masonry-grid-item > a", {
      timeout: 10000,
    });
    const imageLinks = await page.evaluate(() => {
      const links = [];
      const elements = document.querySelectorAll(
        ".bh-photo-modal-masonry-grid-item > a"
      );
      elements.forEach((element, i) => {
        if (i < 20) {
          links.push(element.getAttribute("href"));
        }
      });
      return links;
    });
    await browser.close();
    return imageLinks;
  } catch (error) {
    console.error("Timeout or selector not found");
    console.log(error);
  } finally {
  }
  // const resp = await axios.get(hotelUrlWithImages);
  // ws.write(resp.data)
  // const $ = load(resp.data);
  // $('.bh-photo-modal-masonry-grid-item > a').map((i,e)=>{
  //     return $(e).attr('href')
  // }).toArray();
}
interface Room {
  name: string;
  description: string;
  noGuests: number;
  basePrice: number;
  roomType: string;
}
async function scrapRoom(url: string) {
  const browser = await launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector("#hprt-table", { timeout: 10000 });
    const rooms = await page.evaluate(() => {
      const rooms: Room[] = [];
      const elements = document.querySelectorAll("#hprt-table > tbody > tr");
      elements.forEach((e) =>
        rooms.push({
          name: e.querySelector(".hprt-roomtype-link").textContent,
          roomType: e
            .querySelector(".hprt-roomtype-link")
            .getAttribute("data-room-id"),
          basePrice: extractNumberFromString(
            e.querySelector(".bui-price-display__value").textContent
          ),
          description: e.querySelector(".hprt-roomtype-bed").innerHTML,
          noGuests: e.querySelectorAll(".c-occupancy-icons__adults > i").length,
        } as Room)
      );
      return rooms;
    });
    await browser.close();
    return rooms;
  } catch (error) {
    console.error("Timeout or selector not found");
    console.log(error);
  } finally {
  }
}
async function scrapReviews() {
  // not implement yet
}
