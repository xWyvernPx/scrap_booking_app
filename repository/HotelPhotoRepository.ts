import ds from "../datasource";
import { Photo } from "../entities/Photo";

export const HotelPhotoRepository = ds.then(
  async (ds) => await ds.manager.getRepository(Photo)
);
