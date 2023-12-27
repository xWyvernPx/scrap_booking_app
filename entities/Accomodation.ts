import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AccommodationImage } from "./AccommodationImage";
import { AccomodationCategory } from "./AccomodationCategory";
import { Company } from "./Company";
import { City } from "./City";
import { Room } from "./Room";

@Index("accomodation_pkey", ["id"], { unique: true })
@Entity("accomodation", { schema: "public" })
export class Accomodation {
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

  @Column("boolean", { name: "active" })
  active: boolean;

  @Column("character varying", {
    name: "avatar_url",
    nullable: true,
    length: 255,
  })
  avatarUrl: string | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("character varying", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @Column("numeric", {
    name: "latitude",
    nullable: true,
    precision: 16,
    scale: 2,
  })
  latitude: string | null;

  @Column("numeric", {
    name: "longitude",
    nullable: true,
    precision: 16,
    scale: 2,
  })
  longitude: string | null;

  @OneToMany(
    () => AccommodationImage,
    (accommodationImage) => accommodationImage.accommodation
  )
  accommodationImages: AccommodationImage[];

  @ManyToOne(
    () => AccomodationCategory,
    (accomodationCategory) => accomodationCategory.accomodations
  )
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: AccomodationCategory;

  @ManyToOne(() => Company, (company) => company.accomodations)
  @JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
  company: Company;

  @ManyToOne(() => City, (city) => city.accomodations)
  @JoinColumn([{ name: "city_id", referencedColumnName: "id" }])
  city: City;

  @OneToMany(() => Room, (room) => room.accomodation)
  rooms: Room[];
}
