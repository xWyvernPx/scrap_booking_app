import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Photo } from "./Photo";

@Index("hotel_photo_type_pkey", ["id"], { unique: true })
@Entity("hotel_photo_type", { schema: "public" })
export class HotelPhotoType {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @OneToMany(() => Photo, (photo) => photo.hotelPhotoType)
  photos: Photo[];
}
