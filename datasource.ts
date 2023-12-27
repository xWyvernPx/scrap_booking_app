import { DataSource } from "typeorm";
const ds = new DataSource({
  "name": "default",
  "type": "postgres",
  "host": "wyvernpserver.tech",
  "port": 5432,
  "username": "sa",
  "password": "",
  "database": "",
  "synchronize": false,
  "entities": ["entities/*.{js,ts}"]
})

export default ds;
