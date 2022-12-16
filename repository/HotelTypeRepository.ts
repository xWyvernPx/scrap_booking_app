import ds from "../datasource";
import { HotelType } from "../entities/HotelType";

export const HotelTypeRepository = ds.then(
  async (ds) => await ds.manager.getRepository(HotelType)
);
