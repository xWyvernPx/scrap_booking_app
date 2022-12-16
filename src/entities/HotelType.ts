import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hotel } from "./Hotel";

@Index("hotel_type_pkey", ["id"], { unique: true })
@Entity("hotel_type", { schema: "public" })
export class HotelType {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @OneToMany(() => Hotel, (hotel) => hotel.hotelType)
  hotels: Hotel[];
}
