import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hotel } from "./Hotel";
import { HotelPhotoType } from "./HotelPhotoType";
import { HotelReview } from "./HotelReview";

@Index("photo_pkey", ["id"], { unique: true })
@Entity("photo", { schema: "public" })
export class Photo {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column("character varying", { name: "url", nullable: true, length: 255 })
  url: string | null;

  @ManyToOne(() => Hotel, (hotel) => hotel.photos, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "hotel_id", referencedColumnName: "id" }])
  hotel: Hotel;

  @ManyToOne(() => HotelPhotoType, (hotelPhotoType) => hotelPhotoType.photos)
  @JoinColumn([{ name: "hotel_photo_type", referencedColumnName: "id" }])
  hotelPhotoType: HotelPhotoType;

  @ManyToOne(() => HotelReview, (hotelReview) => hotelReview.photos)
  @JoinColumn([{ name: "review_id", referencedColumnName: "id" }])
  review: HotelReview;
}
