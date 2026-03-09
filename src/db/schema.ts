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
  role: varchar("role", { length: 20 }).default("driver"),
  createdAt: timestamp("created_at").defaultNow()
});

export const chargingStations = mysqlTable("charging_stations", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  latitude: double("latitude"),
  longitude: double("longitude"),
  address: varchar("address", { length: 255 }),
  status: varchar("status", { length: 50 }),
  powerOutput: int("power_output"),
  connectorType: varchar("connector_type", { length: 50 }),
  createdBy: int("created_by")
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow()
});