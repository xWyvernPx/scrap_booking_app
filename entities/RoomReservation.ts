import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Reservation } from "./Reservation";
import { Room } from "./Room";

@Index("room_reservation_pkey", ["id"], { unique: true })
@Entity("room_reservation", { schema: "public" })
export class RoomReservation {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("numeric", { name: "price", nullable: true, precision: 10, scale: 2 })
  price: string | null;

  @Column("integer", { name: "quantity", nullable: true })
  quantity: number | null;

  @ManyToOne(() => Reservation, (reservation) => reservation.roomReservations)
  @JoinColumn([{ name: "reservation_id", referencedColumnName: "id" }])
  reservation: Reservation;

  @ManyToOne(() => Room, (room) => room.roomReservations)
  @JoinColumn([{ name: "room_id", referencedColumnName: "id" }])
  room: Room;
}
