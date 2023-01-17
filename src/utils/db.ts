import * as mysql from "mysql2/promise";

export async function connect(){
  const connection = await mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
  })
  return connection
}