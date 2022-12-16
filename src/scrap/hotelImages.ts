import { WebDriver, until, By } from "selenium-webdriver";

export const scrapHotelPhotos = async (driver: WebDriver) => {
  const nextButton = await (
    await driver.findElements(By.css("div[data-clicksource='CarouselArrow']"))
  )[1];

  console.log(nextButton);
  while (!(await nextButton.getAttribute("class")).includes("gDLAy")) {
    await nextButton.click();
  }
  //   await driver.wait(async () => {
  //     return await (await nextButton.getAttribute("class")).includes("Zhruk");
  //   });
  //   gDLAy _U is-shown-at-tablet ==== DISABLED
  // Zhruk _U _S is-shown-at-tablet ==== ENABLED
};
