import { Column, Entity, Index, ManyToMany } from "typeorm";
import { Timezone } from "./Timezone";

@Index("country_pkey", ["id"], { unique: true })
@Entity("country", { schema: "public" })
export class Country {
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

  @Column("integer", { name: "region_id" })
  regionId: number;

  @Column("integer", { name: "subregion_id" })
  subregionId: number;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("bigint", { primary: true, name: "id" })
  id: string;

  @Column("timestamp without time zone", {
    name: "modified_at",
    nullable: true,
  })
  modifiedAt: Date | null;

  @Column("character varying", { name: "capital", nullable: true, length: 255 })
  capital: string | null;

  @Column("character varying", {
    name: "currency",
    nullable: true,
    length: 255,
  })
  currency: string | null;

  @Column("character varying", {
    name: "currency_name",
    nullable: true,
    length: 255,
  })
  currencyName: string | null;

  @Column("character varying", {
    name: "currency_symbol",
    nullable: true,
    length: 255,
  })
  currencySymbol: string | null;

  @Column("character varying", { name: "emoji", nullable: true, length: 255 })
  emoji: string | null;

  @Column("character varying", { name: "emojiu", nullable: true, length: 255 })
  emojiu: string | null;

  @Column("character varying", { name: "iso2", nullable: true, length: 255 })
  iso2: string | null;

  @Column("character varying", { name: "iso3", nullable: true, length: 255 })
  iso3: string | null;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("character varying", {
    name: "nationality",
    nullable: true,
    length: 255,
  })
  nationality: string | null;

  @Column("character varying", {
    name: "numeric_code",
    nullable: true,
    length: 255,
  })
  numericCode: string | null;

  @Column("character varying", {
    name: "phone_code",
    nullable: true,
    length: 255,
  })
  phoneCode: string | null;

  @Column("character varying", { name: "tld", nullable: true, length: 255 })
  tld: string | null;

  @ManyToMany(() => Timezone, (timezone) => timezone.countries)
  timezones: Timezone[];
}
