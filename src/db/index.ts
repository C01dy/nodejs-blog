import { Pool } from "pg"
import { config } from 'dotenv'
config()

const dbConfig = {
  user: process.env.PGUSER,
  host: process.env.PBHOST,
  database: process.env.PGDATABASE,
  password: process.env.PBPASSWORD,
  port: process.env.PGPORT,
}

export const pool = new Pool(dbConfig)

