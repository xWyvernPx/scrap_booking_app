import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HotelRating } from "./HotelRating";
import { Hotel } from "./Hotel";
import { Photo } from "./Photo";

@Index("hotel_review_pkey", ["id"], { unique: true })
@Entity("hotel_review", { schema: "public" })
export class HotelReview {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "partner", nullable: true, length: 255 })
  partner: string | null;

  @Column("text", { name: "review_content", nullable: true })
  reviewContent: string | null;

  @Column("character varying", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("date", { name: "travel_time", nullable: true })
  travelTime: string | null;

  @OneToMany(() => HotelRating, (hotelRating) => hotelRating.review)
  hotelRatings: HotelRating[];

  @ManyToOne(() => Hotel, (hotel) => hotel.hotelReviews)
  @JoinColumn([{ name: "hotel_id", referencedColumnName: "id" }])
  hotel: Hotel;

  @OneToMany(() => Photo, (photo) => photo.review)
  photos: Photo[];
}
