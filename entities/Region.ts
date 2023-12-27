import { Column, Entity, Index } from "typeorm";

@Index("region_pkey", ["id"], { unique: true })
@Entity("region", { schema: "public" })
export class Region {
  @Column("boolean", { name: "deleted" })
  deleted: boolean;

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
    name: "metadata",
    nullable: true,
    length: 255,
  })
  metadata: string | null;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("character varying", {
    name: "wiki_data_id",
    nullable: true,
    length: 255,
  })
  wikiDataId: string | null;
}
