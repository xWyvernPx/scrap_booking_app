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
  type.forEach((el) => {
    const hotelType = new HotelType();
    hotelType.name = el;
    repo.save(hotelType);
  });
};
