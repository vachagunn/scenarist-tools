import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { createTable } from "./create-table";
import { users } from "./users";

export const admins = createTable("admins", {
  id: varchar("id").primaryKey().$defaultFn(ulid),
  userId: varchar("user_id")
    .notNull()
    .unique()
    .references(() => users.id),
});

export const adminsRelations = relations(admins, ({ one }) => ({
  user: one(users, {
    fields: [admins.userId],
    references: [users.id],
  }),
}));
