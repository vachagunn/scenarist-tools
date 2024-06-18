import { relations } from "drizzle-orm";
import { boolean, primaryKey, timestamp, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { createTable } from "./create-table";
import { eventsToStates } from "./events";
import { intentsToStates } from "./intents";
import { scenarists } from "./scenarists";
import { themes } from "./themes";

// TODO: Ensure uniqueness of state accross linked project
export const states = createTable("states", {
  id: varchar("id").primaryKey().$defaultFn(ulid),
  title: varchar("title").notNull(),
  themeId: varchar("theme_id")
    .references(() => themes.id)
    .notNull(),
  isActive: boolean("is_active").notNull(),
  name: varchar("name").notNull(),
});

export const statesRelations = relations(states, ({ many, one }) => ({
  theme: one(themes, {
    fields: [states.themeId],
    references: [themes.id],
  }),
  intents: many(intentsToStates),
  events: many(eventsToStates),
  ownersHistory: many(statesOwnersHistory),
  children: many(statesHierarchy, { relationName: "parent" }),
  parent: one(statesHierarchy, {
    relationName: "child",
    fields: [states.id],
    references: [statesHierarchy.childId],
  }),
}));

export const statesHierarchy = createTable(
  "states_hierarchy",
  {
    parentId: varchar("parent_id")
      .notNull()
      .references(() => states.id),
    childId: varchar("child_id")
      .notNull()
      .unique()
      .references(() => states.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.parentId, t.childId] }),
  }),
);

export const statesHierarchyRelations = relations(
  statesHierarchy,
  ({ one }) => ({
    parent: one(states, {
      relationName: "parent",
      fields: [statesHierarchy.parentId],
      references: [states.id],
    }),
    child: one(states, {
      relationName: "child",
      fields: [statesHierarchy.childId],
      references: [states.id],
    }),
  }),
);

export const statesOwnersHistory = createTable(
  "states_owners_history",
  {
    stateId: varchar("state_id")
      .notNull()
      .references(() => states.id),
    ownerId: varchar("owner_id")
      .notNull()
      .references(() => scenarists.id),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.stateId, t.ownerId, t.timestamp] }),
  }),
);

export const statesOwnersHistoryRelations = relations(
  statesOwnersHistory,
  ({ one }) => ({
    state: one(states, {
      fields: [statesOwnersHistory.stateId],
      references: [states.id],
    }),
    owner: one(scenarists, {
      fields: [statesOwnersHistory.ownerId],
      references: [scenarists.id],
    }),
  }),
);
