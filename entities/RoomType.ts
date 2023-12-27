import { Column, Entity, Index, OneToMany } from "typeorm";
import { Room } from "./Room";

@Index("room_type_pkey", ["id"], { unique: true })
@Entity("room_type", { schema: "public" })
export class RoomType {
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
    name: "room_type_name",
    nullable: true,
    length: 255,
  })
  roomTypeName: string | null;

  @OneToMany(() => Room, (room) => room.roomType)
  rooms: Room[];
}
