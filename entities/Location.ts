import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hotel } from "./Hotel";

@Index("location_pkey", ["id"], { unique: true })
@Entity("location", { schema: "public" })
export class Location {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "city", nullable: true, length: 255 })
  city: string | null;

  @Column("character varying", {
    name: "country_code",
    nullable: true,
    length: 255,
  })
  countryCode: string | null;

  @Column("character varying", {
    name: "country_name",
    nullable: true,
    length: 255,
  })
  countryName: string | null;

  @Column("character varying", { name: "county", nullable: true, length: 255 })
  county: string | null;

  @Column("character varying", {
    name: "county_code",
    nullable: true,
    length: 255,
  })
  countyCode: string | null;

  @Column("character varying", {
    name: "district",
    nullable: true,
    length: 255,
  })
  district: string | null;

  @Column("character varying", {
    name: "house_number",
    nullable: true,
    length: 255,
  })
  houseNumber: string | null;

  @Column("character varying", { name: "label", nullable: true, length: 255 })
  label: string | null;

  @Column("double precision", { name: "lat", precision: 53 })
  lat: number;

  @Column("double precision", { name: "lng", precision: 53 })
  lng: number;

  @Column("double precision", {
    name: "map_east",
    precision: 53,
    nullable: true,
  })
  mapEast: number;

  @Column("double precision", {
    name: "map_north",
    precision: 53,
    nullable: true,
  })
  mapNorth: number;

  @Column("double precision", {
    name: "map_south",
    precision: 53,
    nullable: true,
  })
  mapSouth: number;

  @Column("double precision", {
    name: "map_west",
    precision: 53,
    nullable: true,
  })
  mapWest: number;

  @Column("character varying", {
    name: "postal_code",
    nullable: true,
    length: 255,
  })
  postalCode: string | null;

  @Column("character varying", { name: "state", nullable: true, length: 255 })
  state: string | null;

  @Column("character varying", {
    name: "state_code",
    nullable: true,
    length: 255,
  })
  stateCode: string | null;

  @Column("character varying", { name: "street", nullable: true, length: 255 })
  street: string | null;

  @Column("character varying", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @ManyToOne(() => Hotel, (hotel) => hotel.locations)
  @JoinColumn([{ name: "hotel_id", referencedColumnName: "id" }])
  hotel: Hotel;
}
