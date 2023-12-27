import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Room } from "./Room";

@Index("room_price_pkey", ["id"], { unique: true })
@Entity("room_price", { schema: "public" })
export class RoomPrice {
  @Column("bigint", { primary: true, name: "id" })
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

  @Column("date", { name: "applied_from", nullable: true })
  appliedFrom: string | null;

  @Column("date", { name: "applied_to", nullable: true })
  appliedTo: string | null;

  @Column("double precision", { name: "price", nullable: true, precision: 53 })
  price: number | null;

  @Column("uuid", { name: "uid", nullable: true })
  uid: string | null;

  @ManyToOne(() => Room, (room) => room.roomPrices)
  @JoinColumn([{ name: "room_id", referencedColumnName: "id" }])
  room: Room;
}
