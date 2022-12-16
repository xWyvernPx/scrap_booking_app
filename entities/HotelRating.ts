import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HotelReview } from "./HotelReview";

@Index("hotel_rating_pkey", ["id"], { unique: true })
@Entity("hotel_rating", { schema: "public" })
export class HotelRating {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("real", { name: "cleanliness_rate", nullable: true, precision: 24 })
  cleanlinessRate: number | null;

  @Column("real", { name: "overall_rate", nullable: true, precision: 24 })
  overallRate: number | null;

  @Column("real", { name: "quality_rate", nullable: true, precision: 24 })
  qualityRate: number | null;

  @Column("real", { name: "service_rate", nullable: true, precision: 24 })
  serviceRate: number | null;

  @ManyToOne(() => HotelReview, (hotelReview) => hotelReview.hotelRatings)
  @JoinColumn([{ name: "review_id", referencedColumnName: "id" }])
  review: HotelReview;
}
