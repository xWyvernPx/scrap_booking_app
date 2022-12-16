import { createConnection } from "typeorm";

const ds = createConnection({
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "sa",
  password: "123456",
  database: "tripadvisor",
  synchronize: false,
  entities: ["entities/*.ts"],
}).then((ds) => ds);

export default ds;
