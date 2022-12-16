import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("account_pkey", ["id"], { unique: true })
@Entity("account", { schema: "public" })
export class Account {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("character varying", {
    name: "firstname",
    nullable: true,
    length: 100,
  })
  firstname: string | null;

  @Column("character varying", {
    name: "lastname",
    nullable: true,
    length: 100,
  })
  lastname: string | null;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column("character varying", { name: "phone", nullable: true, length: 255 })
  phone: string | null;
}
