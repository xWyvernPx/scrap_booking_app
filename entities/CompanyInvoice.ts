import { Column, Entity, Index } from "typeorm";

@Index("company_invoice_pkey", ["id"], { unique: true })
@Entity("company_invoice", { schema: "public" })
export class CompanyInvoice {
  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("double precision", {
    name: "invoice_amount",
    nullable: true,
    precision: 53,
  })
  invoiceAmount: number | null;

  @Column("timestamp without time zone", {
    name: "canceled_at",
    nullable: true,
  })
  canceledAt: Date | null;

  @Column("bigint", { name: "company_id", nullable: true })
  companyId: string | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("timestamp without time zone", { name: "issued_at" })
  issuedAt: Date;

  @Column("timestamp without time zone", {
    name: "modified_at",
    nullable: true,
  })
  modifiedAt: Date | null;

  @Column("timestamp without time zone", { name: "paid_at", nullable: true })
  paidAt: Date | null;

  @Column("text", { name: "invoice_details", nullable: true })
  invoiceDetails: string | null;

  @Column("character varying", {
    name: "invoice_period",
    nullable: true,
    length: 255,
  })
  invoicePeriod: string | null;
}
