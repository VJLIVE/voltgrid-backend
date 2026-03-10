import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

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

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: process.env.DATABASE_URL
    ? parseDbUrl(process.env.DATABASE_URL)
    : {
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT || "3306"),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
      },
});
