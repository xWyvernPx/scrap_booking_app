import ds from "../../datasource";
import { HotelPhotoType } from "../../entities/HotelPhotoType";

export const initDefaultPhotoType = async () => {
  const photoTypeRepo = await (await ds).getRepository(HotelPhotoType);
  let defaultType: HotelPhotoType = await getDefaultPhotoType();
  if (!defaultType) {
    const newPhotoType = new HotelPhotoType();
    newPhotoType.name = "Hotel Original";
    defaultType = await photoTypeRepo.save(newPhotoType);
  }
};

export const getDefaultPhotoType = async () => {
  const photoTypeRepo = await (await ds).getRepository(HotelPhotoType);
  return await photoTypeRepo.findOne({
    where: {
      name: "Hotel Original",
    },
  });
};
