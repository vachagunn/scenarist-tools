import { relations } from "drizzle-orm";
import { timestamp, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { createTable } from "./create-table";
import { users } from "./users";

export const sessions = createTable("sessions", {
  jti: varchar("jti").primaryKey().$defaultFn(ulid),
  sub: varchar("sub")
    .notNull()
    .references(() => users.id),
  iat: timestamp("iat").notNull(),
  nbf: timestamp("nbf").notNull(),
  exp: timestamp("exp").notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.sub],
    references: [users.id],
  }),
}));
