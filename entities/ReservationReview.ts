import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Reservation } from "./Reservation";

@Index("reservation_review_pkey", ["id"], { unique: true })
@Entity("reservation_review", { schema: "public" })
export class ReservationReview {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

  @Column("character varying", { name: "country", nullable: true, length: 255 })
  country: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("text", { name: "interest_about", nullable: true })
  interestAbout: string | null;

  @Column("timestamp without time zone", {
    name: "modified_at",
    nullable: true,
  })
  modifiedAt: Date | null;

  @Column("text", { name: "not_interest_about", nullable: true })
  notInterestAbout: string | null;

  @Column("real", { name: "overall_rating", precision: 24 })
  overallRating: number;

  @Column("character varying", {
    name: "reviewer_avatar",
    nullable: true,
    length: 255,
  })
  reviewerAvatar: string | null;

  @Column("character varying", {
    name: "reviewer_name",
    nullable: true,
    length: 255,
  })
  reviewerName: string | null;

  @ManyToOne(() => Reservation, (reservation) => reservation.reservationReviews)
  @JoinColumn([{ name: "reservation_id", referencedColumnName: "id" }])
  reservation: Reservation;
}
