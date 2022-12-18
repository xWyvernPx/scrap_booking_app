// import { HotelTypeRepository } from "../../repository/HotelTypeRepository";

import ds from "../../datasource";
import { HotelType } from "../../entities/HotelType";
import { initData } from "./initData";

export const getRandomType = async () => {
  const HotelTypeRepository = await (await ds).getRepository(HotelType);
  const hotelTypeRepo = await HotelTypeRepository;
  let types = await hotelTypeRepo.find();
  if (types.length <= 0) {
    await initData();
    types = await hotelTypeRepo.find();
  }

  const random = Math.round(Math.random() * (types.length - 1));
  console.log(random);
  return types[random];
};
