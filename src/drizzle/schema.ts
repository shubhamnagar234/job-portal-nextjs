import {
  int,
  mysqlTable,
  varchar,
  text,
  timestamp,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users_table", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  userName: varchar("username", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: mysqlEnum("role", ["admin", "applicant", "employer"]).default(
    "applicant",
  ),
  phoneNumber: varchar("phone_number", { length: 255 }),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
