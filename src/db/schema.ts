import {
  mysqlTable,
  varchar,
  int,
  double,
  timestamp
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow()
});

export const chargingStations = mysqlTable("charging_stations", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  latitude: double("latitude"),
  longitude: double("longitude"),
  status: varchar("status", { length: 50 }),
  powerOutput: int("power_output"),
  connectorType: varchar("connector_type", { length: 50 }),
  createdBy: int("created_by"),
  createdAt: timestamp("created_at").defaultNow()
});