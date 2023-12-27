import { Column, Entity, Index, OneToMany } from "typeorm";
import { Accomodation } from "./Accomodation";
import { Company } from "./Company";

@Index("city_pkey", ["id"], { unique: true })
@Entity("city", { schema: "public" })
export class City {
  @Column("integer", { name: "country_id" })
  countryId: number;

  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("numeric", {
    name: "latitude",
    nullable: true,
    precision: 38,
    scale: 2,
  })
  latitude: string | null;

  @Column("numeric", {
    name: "longitude",
    nullable: true,
    precision: 38,
    scale: 2,
  })
  longitude: string | null;

  @Column("integer", { name: "state_id" })
  stateId: number;

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
    name: "country_name",
    nullable: true,
    length: 255,
  })
  countryName: string | null;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("character varying", {
    name: "state_name",
    nullable: true,
    length: 255,
  })
  stateName: string | null;

  @Column("character varying", {
    name: "wiki_data_id",
    nullable: true,
    length: 255,
  })
  wikiDataId: string | null;

  @OneToMany(() => Accomodation, (accomodation) => accomodation.city)
  accomodations: Accomodation[];

  @OneToMany(() => Company, (company) => company.city)
  companies: Company[];
}
