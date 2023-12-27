import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Company } from "./Company";
import { Plan } from "./Plan";

@Index("company_plan_pkey", ["id"], { unique: true })
@Entity("company_plan", { schema: "public" })
export class CompanyPlan {
  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("timestamp without time zone", {
    name: "activated_date",
    nullable: true,
  })
  activatedDate: Date | null;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "deactivated_date",
    nullable: true,
  })
  deactivatedDate: Date | null;

  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("timestamp without time zone", {
    name: "modified_at",
    nullable: true,
  })
  modifiedAt: Date | null;

  @ManyToOne(() => Company, (company) => company.companyPlans)
  @JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
  company: Company;

  @ManyToOne(() => Plan, (plan) => plan.companyPlans)
  @JoinColumn([{ name: "plan_id", referencedColumnName: "id" }])
  plan: Plan;
}
