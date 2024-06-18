import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { admins } from "./admins";
import { createTable } from "./create-table";
import { scenarists } from "./scenarists";
import { sessions } from "./sessions";
import { teamleads } from "./teamleads";

export const users = createTable("users", {
  id: varchar("id").primaryKey().$defaultFn(ulid),
  fullName: varchar("full_name").notNull(),
  email: varchar("email").notNull().unique(),
  pictureUrl: varchar("picture_url"),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  scenarist: one(scenarists, {
    fields: [users.id],
    references: [scenarists.userId],
  }),
  teamlead: one(teamleads, {
    fields: [users.id],
    references: [teamleads.userId],
  }),
  admin: one(admins, {
    fields: [users.id],
    references: [admins.userId],
  }),
}));
