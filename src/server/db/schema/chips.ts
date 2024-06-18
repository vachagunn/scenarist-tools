import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { createTable } from "./create-table";
import { events } from "./events";
import { intents } from "./intents";

export const chips = createTable("chips", {
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

export const chipsRelations = relations(chips, ({ one }) => ({
  event: one(events, {
    fields: [chips.eventId],
    references: [events.id],
  }),
  intent: one(intents, {
    fields: [chips.intentId],
    references: [intents.id],
  }),
}));
