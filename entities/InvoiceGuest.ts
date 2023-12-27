import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Guest } from "./Guest";

@Index("invoice_guest_pkey", ["id"], { unique: true })
@Entity("invoice_guest", { schema: "public" })
export class InvoiceGuest {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("numeric", {
    name: "invoice_amount",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  invoiceAmount: string | null;

  @Column("timestamp without time zone", {
    name: "ts_canceled",
    nullable: true,
  })
  tsCanceled: Date | null;

  @Column("timestamp without time zone", { name: "ts_issued", nullable: true })
  tsIssued: Date | null;

  @Column("timestamp without time zone", { name: "ts_paid", nullable: true })
  tsPaid: Date | null;

  @ManyToOne(() => Guest, (guest) => guest.invoiceGuests)
  @JoinColumn([{ name: "guest_id", referencedColumnName: "id" }])
  guest: Guest;
}
