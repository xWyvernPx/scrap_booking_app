import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Accomodation } from "./Accomodation";

@Index("accommodation_image_pkey", ["id"], { unique: true })
@Entity("accommodation_image", { schema: "public" })
export class AccommodationImage {
  @Column("uuid", { primary: true, name: "id" })
  id: string;

  @Column("timestamp without time zone", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("text", { name: "data", nullable: true })
  data: string | null;

  @Column("boolean", { name: "deleted" })
  deleted: boolean;

  @Column("boolean", { name: "is_url" })
  isUrl: boolean;

  @Column("timestamp without time zone", {
    name: "modified_at",
    nullable: true,
  })
  modifiedAt: Date | null;

  @Column("character varying", { name: "url", nullable: true, length: 255 })
  url: string | null;

  @ManyToOne(
    () => Accomodation,
    (accomodation) => accomodation.accommodationImages
  )
  @JoinColumn([{ name: "accommodation_id", referencedColumnName: "id" }])
  accommodation: Accomodation;
}
