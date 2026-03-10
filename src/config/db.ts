import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import dotenv from "dotenv";
import * as schema from "../db/schema";

dotenv.config();

function parseDbUrl(url: string) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: parseInt(u.port || "3306"),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, ""),
    ssl: { rejectUnauthorized: true },
  };
}

// Production providers inject DATABASE_URL; fallback to individual vars for local dev
const pool = process.env.DATABASE_URL
  ? mysql.createPool(parseDbUrl(process.env.DATABASE_URL))
  : mysql.createPool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "3306"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

export const db = drizzle(pool, { schema, mode: "default" });