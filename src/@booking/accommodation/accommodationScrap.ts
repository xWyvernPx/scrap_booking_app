import axios from "axios";
import { load } from "cheerio";
import { createWriteStream } from "fs";
import {launch} from "puppeteer"
function parseHotel(html) {
    const $ = load(html);

    const latLng = $('.show_map_hp_link').attr('data-atlas-latlng').split(',');
    const lat = latLng[0];
    const lng = latLng[1];

    const facilities = [];
    $('[data-capla-component-boundary="b-property-web-property-page/PropertyMostPopularFacilities"] > div > div > ul > li').each((index, feat_box) => {
        const icon = $(feat_box).find(' div > div > span').html();
        const feats = $(feat_box).find(' div > div > div > span > div > span').text().trim();
        facilities.splice(facilities.length,0, {
            icon,
            name : feats
        });
    });
    
    const features = {};
    $('[data-testid="property-section--content"] > .e50d7535fa > div  > div ').each((index, feat_box) => {
        const typeIcon = $(feat_box).find(' div > div > div > span').html();
        const feats = $(feat_box).find('ul > li').map((i,e) => ({
            icon : $(e).find('div > div > span').html(),
            name : $(e).find('div > div > div > span > div >span').text().trim(),
            additional_charge : $(e).find('.abf093bdfe.c147fc6dd1.d9a5b87e39.b81491d8c4')?.text() === 'Additional charge'??false
        })).toArray();
        const type = $(feat_box).find(' div > div > .d1ca9115fe').text().trim();
        const note = $(feat_box).find('.a53cbfa6de.f45d8e4c32.df64fda51b').text().trim();
        features[type] = {
            icon: typeIcon,
            features : feats,
            note
        };
    });
    
    const data = {
        title: $('div[data-capla-component-boundary="b-property-web-property-page/PropertyHeaderName"] > h2').text().trim(),
        description: $('div#property_description_content').text().trim().replace(/\n/g, ''),
        address: $('.hp_address_subtitle').text().trim(),
        lat: lat,
        lng: lng,
        facilities: facilities,
        id: html.match(/b_hotel_id:\s*'(.+?)'/)[1],
        url: '',
        features,
    };

    return data;
}

async function fetchHotel(url) {
    const resp = await axios.get(url);
    const hotel = parseHotel(resp.data);
    // const hotel = {url:''};
    hotel.url = resp.config.url;
    hotel['images'] = await scrapImage(url);
    return hotel;
}
export async function scrapeHotels(urls: string[]) {
    const hotels = await Promise.all(urls.map(url => fetchHotel(url)));
    return hotels;
}
export async function scrapeHotel(url:string) {
    const hotel = await  fetchHotel(url);
    return hotel;
}

async function scrapImage(hotelUrl: string){
    const browser = await launch({headless:false});
    try {
        
    const hotelUrlWithImages = hotelUrl.replace("#hotelTmpl", "&activeTab=photosGallery");
    const page = await browser.newPage();
    await page.goto(hotelUrlWithImages);
    await page.waitForSelector('.bh-photo-modal-masonry-grid-item > a', { timeout: 10000 });
    const imageLinks = await page.evaluate(() => {
        const links = [];
        const elements = document.querySelectorAll('.bh-photo-modal-masonry-grid-item > a');
        elements.forEach((element) => {
          links.push(element.getAttribute('href'));
        });
        return links;
      });
      return imageLinks;
    } catch (error) {
        console.error('Timeout or selector not found');
        console.log(error);
        
    }finally {
        await browser.close();
      }
    // const resp = await axios.get(hotelUrlWithImages);
    // ws.write(resp.data)
    // const $ = load(resp.data);
    // $('.bh-photo-modal-masonry-grid-item > a').map((i,e)=>{
    //     return $(e).attr('href')
    // }).toArray();
}
async function scrapRoom(){

}
async function scrapReviews(){

}
//https://www.booking.com/hotel/vn/phuong-nam-resort.en-gb.html?aid=304142&label=gen173nr-1FCAIo9AFCAnZuSDNYBGj0AYgBAZgBMbgBF8gBDNgBAegBAfgBAogCAagCA7gCnr6wrAbAAgHSAiQzZWNkNjc2Yi1jMTc1LTRkMGItYTYxZi00YTg1N2ZlNmUyMDfYAgXgAgE&sid=5c25e25add98421e566d01b76e445db9&checkin=2024-03-01&checkout=2024-03-02&dest_id=-3730078&dest_type=city&dist=0&do_availability_check=1&group_adults=1&group_children=0&hp_avform=1&hp_group_set=0&no_rooms=1&origin=hp&sb_price_type=total&src=hotel&type=total&activeTab=main
//https://www.booking.com/hotel/vn/phuong-nam-resort.en-gb.html?aid=304142&label=gen173nr-1FCAIo9AFCAnZuSDNYBGj0AYgBAZgBMbgBF8gBDNgBAegBAfgBAogCAagCA7gCnr6wrAbAAgHSAiQzZWNkNjc2Yi1jMTc1LTRkMGItYTYxZi00YTg1N2ZlNmUyMDfYAgXgAgE&sid=5c25e25add98421e566d01b76e445db9&checkin=2024-03-01&checkout=2024-03-02&dest_id=-3730078&dest_type=city&dist=0&do_availability_check=1&group_adults=1&group_children=0&hp_avform=1&hp_group_set=0&no_rooms=1&origin=hp&sb_price_type=total&src=hotel&type=total&activeTab=photosGallery