import { Column, Entity, Index, OneToMany } from "typeorm";
import { CompanyPlan } from "./CompanyPlan";

@Index("plan_pkey", ["id"], { unique: true })
@Entity("plan", { schema: "public" })
export class Plan {
  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("double precision", { name: "monthly_price", precision: 53 })
  monthlyPrice: number;

  @Column("integer", { name: "room_max" })
  roomMax: number;

  @Column("integer", { name: "room_min" })
  roomMin: number;

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
    name: "plan_name",
    nullable: true,
    length: 64,
  })
  planName: string | null;

  @Column("text", { name: "details", nullable: true })
  details: string | null;

  @OneToMany(() => CompanyPlan, (companyPlan) => companyPlan.plan)
  companyPlans: CompanyPlan[];
}
