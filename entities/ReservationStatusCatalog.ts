import { Column, Entity, Index, OneToMany } from "typeorm";
import { ReservationStatusEvent } from "./ReservationStatusEvent";

@Index("reservation_status_catalog_pkey", ["id"], { unique: true })
@Entity("reservation_status_catalog", { schema: "public" })
export class ReservationStatusCatalog {
  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("character varying", {
    name: "status_name",
    nullable: true,
    length: 255,
  })
  statusName: string | null;

  @OneToMany(
    () => ReservationStatusEvent,
    (reservationStatusEvent) => reservationStatusEvent.reservationStatusCatalog
  )
  reservationStatusEvents: ReservationStatusEvent[];
}
