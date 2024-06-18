import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { createTable } from "./create-table";
import { events } from "./events";
import { intents } from "./intents";

export const tiles = createTable("tiles", {
  id: varchar("id").primaryKey().$defaultFn(ulid),
  text: varchar("text").notNull(),
  description: varchar("description").notNull(),
  eventId: varchar("event_id")
    .unique()
    .notNull()
    .references(() => events.id),
  intentId: varchar("intent_id")
    .notNull()
    .references(() => intents.id),
});

export const tilesRelations = relations(tiles, ({ one }) => ({
  event: one(events, {
    fields: [tiles.eventId],
    references: [events.id],
  }),
  intent: one(intents, {
    fields: [tiles.intentId],
    references: [intents.id],
  }),
}));
