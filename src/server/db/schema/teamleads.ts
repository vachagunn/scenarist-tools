import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { createTable } from "./create-table";
import { scenarists } from "./scenarists";
import { users } from "./users";

export const teamleads = createTable("teamleads", {
  id: varchar("id").primaryKey().$defaultFn(ulid),
  userId: varchar("user_id")
    .unique()
    .references(() => users.id),
});

export const teamleadsRelations = relations(teamleads, ({ one, many }) => ({
  user: one(users, {
    fields: [teamleads.userId],
    references: [users.id],
  }),
  team: many(scenarists),
}));
