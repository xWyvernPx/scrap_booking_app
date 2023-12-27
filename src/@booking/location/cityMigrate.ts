import { By, WebElement } from "selenium-webdriver";
import GenericRepository from "../../../repository/BaseRepository";

import ds from "../../../datasource";
import { City } from "../../../entities/City";

export const migrateCity  = async (anchorElement: WebElement)=>{
    
    const cityRepo =   ds.getRepository(City);
    const cityName = await anchorElement.findElement(By.css('.bui-card__content .bui-card__title')).getText();
    const persistedCity = await cityRepo
    .createQueryBuilder("city")
    .where(`unaccent(city.name) ILIKE unaccent(concat('%', '${cityName}', '%'))`).getOne();
    return persistedCity;
}