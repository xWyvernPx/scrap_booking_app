import {
  By,
  Condition,
  WebDriver,
  WebElement,
  until,
} from "selenium-webdriver";
import { City } from "../../../entities/City";
import { migrateAccommodationType } from "../accommodation/migrateAccommodationType";

interface CityLink {
  city: City;
  link: string;
}
export const accommodationDetailPage = async (
  { city, link }: CityLink,
  driver: WebDriver
) => {
  await driver.get(link);
  await driver
    .findElement(
      By.xpath(
        "/html/body/div[2]/div/div[4]/div[2]/div/div[2]/div[4]/div[11]/a"
      )
    )
    .click();
  const searchResultDiv = await driver.wait(
    until.elementLocated(By.xpath('//div[contains(text(), "Search results")]')),
    10000
  );
  // const adbutton = await driver.findElement(
  //     By.css('button.a83ed08757[aria-label="Dismiss sign-in info."]')
  //   );
  //     if(adbutton){
  //         await adbutton.click();
  //     }
  const element = await driver.wait(
    until.elementLocated(By.xpath(`//*[contains(text(), 'Property Type')]`)),
    10000
  );

  // Find the parent container div of the element
  const containerDiv = (await driver.executeScript(
    "return arguments[0].parentNode.parentNode;", // Retrieve the parent node
    element
  )) as WebElement;
    const button = await containerDiv.findElement(By.css(`button.a83ed08757.f88a5204c2.a16392a689.b98133fb50`));

    // Click the button
    await button.click();

  const accommodationTypeEles = await containerDiv.findElements(
    By.xpath(".//div[@data-filters-item]")
  );
//   const accommodationTypes = await Promise.all(
//     accommodationTypeEles.map(
//       async (e) =>
//         await e.findElement(By.xpath(".//label/span[3]/div/div/div")).getText()
//     )
//   );
//   migrateAccommodationType(accommodationTypes);
  await accommodationTypeEles[1].findElement(By.css("label")).click();
  await driver.sleep(10000);
  const accommodationCards = await driver.findElements(
    By.xpath('//div[@data-testid="property-card"]')
  );
  const accommodationLinks = await Promise.all(accommodationCards.map(async (ac) => (await ac.findElement(By.css('a')).getAttribute('href'))))
  console.log(accommodationLinks);
};
