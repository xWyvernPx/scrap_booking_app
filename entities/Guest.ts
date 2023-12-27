import { Column, Entity, Index, OneToMany } from "typeorm";
import { InvoiceGuest } from "./InvoiceGuest";
import { Reservation } from "./Reservation";

@Index("guest_pkey", ["id"], { unique: true })
@Entity("guest", { schema: "public" })
export class Guest {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("character varying", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("text", { name: "details", nullable: true })
  details: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("character varying", {
    name: "first_name",
    nullable: true,
    length: 255,
  })
  firstName: string | null;

  @Column("character varying", {
    name: "last_name",
    nullable: true,
    length: 255,
  })
  lastName: string | null;

  @Column("character varying", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @OneToMany(() => InvoiceGuest, (invoiceGuest) => invoiceGuest.guest)
  invoiceGuests: InvoiceGuest[];

  @OneToMany(() => Reservation, (reservation) => reservation.guest)
  reservations: Reservation[];
}
