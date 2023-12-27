import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Guest } from "./Guest";
import { ReservationReview } from "./ReservationReview";
import { ReservationStatusEvent } from "./ReservationStatusEvent";
import { RoomReservation } from "./RoomReservation";

@Index("reservation_pkey", ["id"], { unique: true })
@Entity("reservation", { schema: "public" })
export class Reservation {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("date", { name: "end_date", nullable: true })
  endDate: string | null;

  @Column("date", { name: "start_date", nullable: true })
  startDate: string | null;

  @Column("numeric", {
    name: "total_price",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  totalPrice: string | null;

  @Column("timestamp without time zone", { name: "ts_created", nullable: true })
  tsCreated: Date | null;

  @Column("timestamp without time zone", { name: "ts_updated", nullable: true })
  tsUpdated: Date | null;

  @Column("boolean", { name: "book_for_some_one" })
  bookForSomeOne: boolean;

  @Column("text", { name: "guests", nullable: true })
  guests: string | null;

  @Column("text", { name: "remark", nullable: true })
  remark: string | null;

  @ManyToOne(() => Guest, (guest) => guest.reservations)
  @JoinColumn([{ name: "guest_id", referencedColumnName: "id" }])
  guest: Guest;

  @OneToMany(
    () => ReservationReview,
    (reservationReview) => reservationReview.reservation
  )
  reservationReviews: ReservationReview[];

  @OneToMany(
    () => ReservationStatusEvent,
    (reservationStatusEvent) => reservationStatusEvent.reservation
  )
  reservationStatusEvents: ReservationStatusEvent[];

  @OneToMany(
    () => RoomReservation,
    (roomReservation) => roomReservation.reservation
  )
  roomReservations: RoomReservation[];
}
