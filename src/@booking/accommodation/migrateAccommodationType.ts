import { By, WebElement } from "selenium-webdriver";
import ds from "../../../datasource";
import { AccomodationCategory } from "../../../entities/AccomodationCategory";
import { Like } from "typeorm";
import { v4 } from "uuid";
export const migrateAccommodationType = async (
  accommodationTypes: string[]
) => {
  const accommoTypeRepo = ds.getRepository(AccomodationCategory);

  console.log(accommodationTypes);

  const persistedTypes = await Promise.all(
    accommodationTypes.map(async (typeName) => {
      console.log("PERSISTING ", typeName);

      var persistedAccommodationType = await accommoTypeRepo.findOne({
        where: {
          accomodationCategoryName: Like(typeName),
        },
      });
      if (!!!persistedAccommodationType) {
        persistedAccommodationType = await accommoTypeRepo.create({
          accomodationCategoryName: typeName,
          createdAt: new Date(),
          modifiedAt: new Date(),
          deleted: false,
          id: v4(),
        });
      }
      await accommoTypeRepo.save(persistedAccommodationType);
      return persistedAccommodationType;
    })
  );
  console.log(persistedTypes);
};
