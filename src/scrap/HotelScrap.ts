import { Browser, Builder, By, WebDriver } from "selenium-webdriver";

import { Options } from "selenium-webdriver/firefox";
import ds from "../../datasource";
import { Hotel } from "../../entities/Hotel";
import { HotelType } from "../../entities/HotelType";
import { Location } from "../../entities/Location";
import { getGeoCode } from "../utils/getGeocode";
import { getRandomType } from "../utils/getRandomType";
import { scrapHotelPhotos } from "./hotelImages";
export const HotelScrap = async (address: string) => {
  const ops = new Options();
  ops.windowSize({ width: 1920, height: 1080 });
  let driver = await new Builder()
    .forBrowser(Browser.FIREFOX)
    .setFirefoxOptions(ops)
    .build();
  // await driver.switchTo().newWindow("tab");

  await driver.get(address);
  const hotelType: HotelType = await getRandomType();

  const hotel_address = await driver
    .findElement(By.css("span[class='fHvkI PTrfg']"))
    .getText();

  const hotelName = await driver.findElement(By.css(".QdLfr.b.d.Pn")).getText();
  let phone_number;
  try {
    phone_number = await driver
      .findElement({
        css: ".zNXea.NXOxh.NjUDn",
      })
      .getText();
  } catch (error) {
    phone_number = "";
  }
  // const url_hotel = await driver
  //   .findElement(By.css(".YnKZo.Ci.Wc._S.C.pInXB._S.ITocq.jNmfd"))
  //   .getAttribute("href");
  let hotelClass;
  try {
    hotelClass = await (
      await driver
        .findElement(By.css("svg[class='JXZuC d H0']"))
        .getAttribute("aria-label")
    ).split(" ")?.[0];
  } catch (error) {
    hotelClass = "";
  }
  // const url_affilate = await driver
  //   .findElement(By.css(".YnKZo.Ci.Wc._S.C.pInXB._S.ITocq.NjUDn"))
  //   .getAttribute("href");
  const hotel_description = await driver
    .findElement(By.css("div[class='fIrGe _T']"))
    .getText();
  const thumbnail = await (
    await driver
      .findElement(By.css(".CEZFh.s._U.xVnGc div div picture img"))
      .getAttribute("srcset")
  )
    .split(",")
    .pop();
  const hotel = new Hotel();
  hotel.name = hotelName;
  hotel.hotelType = hotelType;
  hotel.description = hotel_description;
  hotel.phoneNumber = phone_number;
  hotel.hotelClass = hotelClass;
  hotel.thumbnail = thumbnail || "https://source.unsplash.com/random";

  const locationDetail = await getGeoCode(hotel_address);
  // const {
  //   title,
  //   address: {
  //     label,
  //     countryCode,
  //     countryName,
  //     state,
  //     county,
  //     city,
  //     district,
  //     street,
  //     postalCode,
  //     houseNumber,
  //   },
  //   position: { lat, lng },
  //   mapView: { west, south, east, north },
  // } = locationDetail;
  const location = new Location();

  if (locationDetail) {
    location.title = locationDetail?.title;
    location.label = locationDetail?.address?.label;
    location.countryCode = locationDetail?.address?.countryCode;
    location.countryName = locationDetail?.address?.countryName;
    location.state = locationDetail?.address?.state || "";
    location.countyCode = locationDetail?.address?.countyCode || "";
    location.stateCode = locationDetail?.address?.stateCode || "";
    location.county = locationDetail?.address?.county;
    location.city = locationDetail?.address?.city;
    location.district = locationDetail?.address?.district;
    location.street = locationDetail?.address?.street;
    location.postalCode = locationDetail?.address?.postalCode;
    location.houseNumber = locationDetail?.address?.houseNumber;
    location.lat = locationDetail?.position?.lat;
    location.lng = locationDetail?.position?.lng;
    location.mapWest = locationDetail?.mapView?.west || 0;
    location.mapEast = locationDetail?.mapView?.east || 0;
    location.mapNorth = locationDetail?.mapView?.north || 0;
    location.mapSouth = locationDetail?.mapView?.south || 0;
    location.hotel = hotel;
  }
  // await scrapHotelPhotos(driver);
  if (hotel.locations) {
    hotel.locations = [...hotel?.locations, location];
  } else {
    hotel.locations = [location];
  }
  await ds.then(async (ds) => {
    // console.log(location);
    await ds.manager.save(hotel);
    await ds.manager.save(location);
  });
  await driver.close();
};
