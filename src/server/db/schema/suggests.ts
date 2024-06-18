import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { createTable } from "./create-table";
import { events } from "./events";
import { intents } from "./intents";

export const suggests = createTable("suggests", {
  id: varchar("id").primaryKey().$defaultFn(ulid),
  text: varchar("text").notNull(),
  eventId: varchar("event_id")
    .unique()
    .notNull()
    .references(() => events.id),
  intentId: varchar("intent_id")
    .notNull()
    .references(() => intents.id),
});

export const suggestsRelations = relations(suggests, ({ one }) => ({
  event: one(events, {
    fields: [suggests.eventId],
    references: [events.id],
  }),
  intent: one(intents, {
    fields: [suggests.intentId],
    references: [intents.id],
  }),
}));
