import { pgTable, text, serial, varchar, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  employerId: varchar("employer_id", { length: 100 }).notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  dateOfJoining: date("date_of_joining").notNull(),
  department: varchar("department", { length: 100 }).notNull(),
  designation: varchar("designation", { length: 100 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }).notNull(),
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
});

export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
