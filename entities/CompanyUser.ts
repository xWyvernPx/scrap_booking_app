import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Company } from "./Company";

@Index("company_user_pkey", ["id"], { unique: true })
@Entity("company_user", { schema: "public" })
export class CompanyUser {
  @Column("boolean", { name: "active" })
  active: boolean;

  @Column("boolean", { name: "approved" })
  approved: boolean;

  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("boolean", { name: "owner" })
  owner: boolean;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("timestamp without time zone", {
    name: "modified_at",
    nullable: true,
  })
  modifiedAt: Date | null;

  @Column("character varying", {
    name: "first_name",
    nullable: true,
    length: 128,
  })
  firstName: string | null;

  @Column("character varying", {
    name: "last_name",
    nullable: true,
    length: 128,
  })
  lastName: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column("character varying", {
    name: "username",
    nullable: true,
    length: 255,
  })
  username: string | null;

  @Column("character varying", { name: "phone", nullable: true, length: 255 })
  phone: string | null;

  @ManyToOne(() => Company, (company) => company.companyUsers)
  @JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
  company: Company;
}
