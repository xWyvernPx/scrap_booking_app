import { Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { Country } from "./Country";

@Index("timezone_pkey", ["id"], { unique: true })
@Entity("timezone", { schema: "public" })
export class Timezone {
  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("integer", { name: "gmt_offset" })
  gmtOffset: number;

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
    name: "abbreviation",
    nullable: true,
    length: 255,
  })
  abbreviation: string | null;

  @Column("character varying", {
    name: "gmt_offset_name",
    nullable: true,
    length: 255,
  })
  gmtOffsetName: string | null;

  @Column("character varying", { name: "tz_name", nullable: true, length: 255 })
  tzName: string | null;

  @Column("character varying", {
    name: "zone_name",
    nullable: true,
    length: 255,
  })
  zoneName: string | null;

  @ManyToMany(() => Country, (country) => country.timezones)
  @JoinTable({
    name: "country_timezone",
    joinColumns: [{ name: "tag_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "country_id", referencedColumnName: "id" }],
    schema: "public",
  })
  countries: Country[];
}
