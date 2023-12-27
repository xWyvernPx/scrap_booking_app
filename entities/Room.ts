import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Accomodation } from "./Accomodation";
import { RoomType } from "./RoomType";
import { RoomPrice } from "./RoomPrice";
import { RoomReservation } from "./RoomReservation";

@Index("room_pkey", ["id"], { unique: true })
@Entity("room", { schema: "public" })
export class Room {
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

  @Column("double precision", {
    name: "default_price",
    nullable: true,
    precision: 53,
  })
  defaultPrice: number | null;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("integer", { name: "max_adults", nullable: true })
  maxAdults: number | null;

  @Column("integer", { name: "max_children", nullable: true })
  maxChildren: number | null;

  @Column("integer", { name: "quantity", nullable: true })
  quantity: number | null;

  @Column("character varying", {
    name: "room_name",
    nullable: true,
    length: 255,
  })
  roomName: string | null;

  @ManyToOne(() => Accomodation, (accomodation) => accomodation.rooms)
  @JoinColumn([{ name: "accomodation_id", referencedColumnName: "id" }])
  accomodation: Accomodation;

  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  @JoinColumn([{ name: "room_type_id", referencedColumnName: "id" }])
  roomType: RoomType;

  @OneToMany(() => RoomPrice, (roomPrice) => roomPrice.room)
  roomPrices: RoomPrice[];

  @OneToMany(() => RoomReservation, (roomReservation) => roomReservation.room)
  roomReservations: RoomReservation[];
}
