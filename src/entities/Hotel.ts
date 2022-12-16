import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HotelType } from "./HotelType";
import { HotelReview } from "./HotelReview";
import { Photo } from "./Photo";

@Index("hotel_pkey", ["id"], { unique: true })
@Entity("hotel", { schema: "public" })
export class Hotel {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("character varying", {
    name: "hotel_class",
    nullable: true,
    length: 255,
  })
  hotelClass: string | null;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 255,
  })
  phoneNumber: string | null;

  @Column("character varying", {
    name: "thumbnail",
    nullable: true,
    length: 255,
  })
  thumbnail: string | null;

  @ManyToOne(() => HotelType, (hotelType) => hotelType.hotels)
  @JoinColumn([{ name: "hotel_type_id", referencedColumnName: "id" }])
  hotelType: HotelType;

  @OneToMany(() => HotelReview, (hotelReview) => hotelReview.hotel)
  hotelReviews: HotelReview[];

  @OneToMany(() => Photo, (photo) => photo.hotel)
  photos: Photo[];
}
