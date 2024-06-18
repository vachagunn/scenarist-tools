import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { createTable } from "./create-table";
import { statesOwnersHistory } from "./states";
import { teamleads } from "./teamleads";
import { users } from "./users";

export const scenarists = createTable("scenarists", {
  id: varchar("id").primaryKey().$defaultFn(ulid),
  userId: varchar("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
  teamleadId: varchar("teamlead_id")
    .notNull()
    .references(() => teamleads.id),
});

export const scenaristsRelations = relations(scenarists, ({ one, many }) => ({
  user: one(users, {
    fields: [scenarists.userId],
    references: [users.id],
  }),
  teamlead: one(teamleads, {
    fields: [scenarists.teamleadId],
    references: [teamleads.id],
  }),
  statesHistory: many(statesOwnersHistory),
}));
