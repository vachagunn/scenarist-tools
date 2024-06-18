import { relations } from "drizzle-orm";
import { boolean, primaryKey, unique, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { chips } from "./chips";
import { createTable } from "./create-table";
import { projects } from "./projects";
import { states } from "./states";
import { suggests } from "./suggests";
import { tiles } from "./tiles";

export const events = createTable(
  "events",
  {
    id: varchar("id").primaryKey().$defaultFn(ulid),
    title: varchar("title").notNull(),
    projectId: varchar("project_id")
      .references(() => projects.id)
      .notNull(),
    name: varchar("name").notNull(),
  },
  (t) => ({
    unq: unique().on(t.title, t.projectId),
  }),
);

export const eventsRelations = relations(events, ({ one, many }) => ({
  project: one(projects, {
    fields: [events.projectId],
    references: [projects.id],
  }),
  states: many(eventsToStates),
  chip: one(chips, {
    fields: [events.id],
    references: [chips.eventId],
  }),
  tile: one(tiles, {
    fields: [events.id],
    references: [tiles.eventId],
  }),
  suggests: one(suggests, {
    fields: [events.id],
    references: [suggests.eventId],
  }),
}));

export const eventsToStates = createTable(
  "events_to_states",
  {
    eventId: varchar("event_id")
      .notNull()
      .references(() => events.id),
    stateId: varchar("state_id")
      .notNull()
      .references(() => states.id),
    isGlobal: boolean("is_global").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.eventId, t.stateId] }),
  }),
);

export const eventsToStatesRelations = relations(eventsToStates, ({ one }) => ({
  event: one(events, {
    fields: [eventsToStates.eventId],
    references: [events.id],
  }),
  state: one(states, {
    fields: [eventsToStates.stateId],
    references: [states.id],
  }),
}));
