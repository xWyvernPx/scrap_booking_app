import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Accomodation } from "./Accomodation";
import { City } from "./City";
import { CompanyPlan } from "./CompanyPlan";
import { CompanyUser } from "./CompanyUser";

@Index("company_pkey", ["id"], { unique: true })
@Entity("company", { schema: "public" })
export class Company {
  @Column("boolean", { name: "active" })
  active: boolean;

  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("timestamp without time zone", {
    name: "modified_at",
    nullable: true,
  })
  modifiedAt: Date | null;

  @Column("character varying", { name: "tax_id", nullable: true, length: 25 })
  taxId: string | null;

  @Column("character varying", {
    name: "company_address",
    nullable: true,
    length: 255,
  })
  companyAddress: string | null;

  @Column("character varying", {
    name: "company_name",
    nullable: true,
    length: 255,
  })
  companyName: string | null;

  @Column("text", { name: "details", nullable: true })
  details: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("character varying", { name: "uid", nullable: true, length: 255 })
  uid: string | null;

  @OneToMany(() => Accomodation, (accomodation) => accomodation.company)
  accomodations: Accomodation[];

  @ManyToOne(() => City, (city) => city.companies)
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: City;

  @OneToMany(() => CompanyPlan, (companyPlan) => companyPlan.company)
  companyPlans: CompanyPlan[];

  @OneToMany(() => CompanyUser, (companyUser) => companyUser.company)
  companyUsers: CompanyUser[];
}
