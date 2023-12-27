import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Reservation } from "./Reservation";
import { ReservationStatusCatalog } from "./ReservationStatusCatalog";

@Index("reservation_status_event_pkey", ["id"], { unique: true })
@Entity("reservation_status_event", { schema: "public" })
export class ReservationStatusEvent {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("text", { name: "details", nullable: true })
  details: string | null;

  @Column("timestamp without time zone", { name: "ts_created", nullable: true })
  tsCreated: Date | null;

  @ManyToOne(
    () => Reservation,
    (reservation) => reservation.reservationStatusEvents
  )
  @JoinColumn([{ name: "reservation_id", referencedColumnName: "id" }])
  reservation: Reservation;

  @ManyToOne(
    () => ReservationStatusCatalog,
    (reservationStatusCatalog) =>
      reservationStatusCatalog.reservationStatusEvents
  )
  @JoinColumn([
    { name: "reservation_status_catalog_id", referencedColumnName: "id" },
  ])
  reservationStatusCatalog: ReservationStatusCatalog;
}
