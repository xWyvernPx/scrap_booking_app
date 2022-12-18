import { HotelType } from "../../entities/HotelType";
import { HotelTypeRepository } from "../../repository/HotelTypeRepository";
export const initData = async () => {
  const type = [
    "Business",
    "Family",
    "Motel",
    "Spa",
    "Luxury",
    "Beach",
    "Campground",
  ];
  const repo = await HotelTypeRepository;
  const types = await repo.find();
  if (types.length > 0) return;
  type.forEach((el) => {
    const hotelType = new HotelType();
    hotelType.name = el;
    repo.save(hotelType);
  });
};
