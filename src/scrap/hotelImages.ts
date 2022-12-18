import { WebDriver, until, By, Button, Key } from "selenium-webdriver";
import { Hotel } from "../../entities/Hotel";
import { Photo } from "../../entities/Photo";
import { HotelPhotoRepository } from "../../repository/HotelPhotoRepository";
import { getDefaultPhotoType } from "../utils/initDefaultPhotoType";
import { error, info } from "winston";
export const scrapHotelPhotos = async (driver: WebDriver, hotel: Hotel) => {
  try {
    const nextButton = await (
      await driver.findElements(By.css("div[data-clicksource='CarouselArrow']"))
    )[1];
    await driver.actions().sendKeys(Key.ESCAPE);
    const LIMIT_IMAGES_FETCHED = 1000;
    let countImagesSaved = 0;

    const EACH_STACK_LIMIT = 20;
    let countStack = 0;
    while (!(await nextButton.getAttribute("class")).includes("gDLAy")) {
      await driver.sleep(200);
      let image;
      if (countImagesSaved > LIMIT_IMAGES_FETCHED) {
        break;
      }
      if (countStack == EACH_STACK_LIMIT) {
        await driver.sleep(3000);
        countStack = 0;
      }
      try {
        image = await (
          await driver
            .findElement(By.css(".CEZFh.s._U.xVnGc div div picture img"))
            .getAttribute("srcset")
        )
          .split(",")
          .pop();
      } catch (e) {
        error("image not loaded");
        continue;
      }
      const photoRepository = await HotelPhotoRepository;
      const photo = new Photo();
      photo.url = image;
      photo.description = "";

      photo.hotel = hotel;
      photo.hotelPhotoType = await getDefaultPhotoType();
      await photoRepository.save(photo).then(() => countImagesSaved++);
      await nextButton.click();
      countStack++;
    }
    //   await driver.wait(async () => {
    //     return await (await nextButton.getAttribute("class")).includes("Zhruk");
    //   });
    //   gDLAy _U is-shown-at-tablet ==== DISABLED
    // Zhruk _U _S is-shown-at-tablet ==== ENABLED
  } catch (e) {
    error("ERROR - HotelImageScrap.ts - Error: " + e);
    return;
  }
};
