import { Column, Entity, Index, OneToMany } from "typeorm";
import { Accomodation } from "./Accomodation";

@Index("accomodation_category_pkey", ["id"], { unique: true })
@Entity("accomodation_category", { schema: "public" })
export class AccomodationCategory {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("timestamp without time zone", {
    name: "modified_at",
    nullable: true,
  })
  modifiedAt: Date | null;

  @Column("character varying", {
    name: "accomodation_category_name",
    nullable: true,
    length: 255,
  })
  accomodationCategoryName: string | null;

  @OneToMany(() => Accomodation, (accomodation) => accomodation.category)
  accomodations: Accomodation[];
}
