import { relations } from "drizzle-orm";
import { boolean, primaryKey, unique, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { chips } from "./chips";
import { createTable } from "./create-table";
import { projects } from "./projects";
import { states } from "./states";
import { suggests } from "./suggests";
import { tiles } from "./tiles";

export const intents = createTable(
  "intents",
  {
    id: varchar("id").primaryKey().$defaultFn(ulid),
    title: varchar("title").notNull(),
    projectId: varchar("project_id")
      .references(() => projects.id)
      .notNull(),
    isActive: boolean("is_active").notNull(),
    name: varchar("name").notNull(),
  },
  (t) => ({
    unq: unique().on(t.title, t.projectId),
  }),
);

export const intentsRelations = relations(intents, ({ many, one }) => ({
  project: one(projects, {
    fields: [intents.projectId],
    references: [projects.id],
  }),
  states: many(intentsToStates),
  chip: one(chips, {
    fields: [intents.id],
    references: [chips.eventId],
  }),
  tile: one(tiles, {
    fields: [intents.id],
    references: [tiles.eventId],
  }),
  suggests: one(suggests, {
    fields: [intents.id],
    references: [suggests.eventId],
  }),
  children: many(intentsHierarchy, { relationName: "parent" }),
  parent: one(intentsHierarchy, {
    relationName: "child",
    fields: [intents.id],
    references: [intentsHierarchy.childId],
  }),
}));

export const intentsHierarchy = createTable(
  "intents_hierarchy",
  {
    parentId: varchar("parent_id")
      .notNull()
      .references(() => intents.id),
    childId: varchar("child_id")
      .notNull()
      .unique()
      .references(() => intents.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.parentId, t.childId] }),
  }),
);

export const intentsHierarchyRelations = relations(
  intentsHierarchy,
  ({ one }) => ({
    parent: one(intents, {
      relationName: "parent",
      fields: [intentsHierarchy.parentId],
      references: [intents.id],
    }),
    child: one(intents, {
      relationName: "child",
      fields: [intentsHierarchy.childId],
      references: [intents.id],
    }),
  }),
);

export const intentsToStates = createTable(
  "intents_to_states",
  {
    intentId: varchar("intent_id")
      .notNull()
      .references(() => intents.id),
    stateId: varchar("state_id")
      .notNull()
      .references(() => states.id),
    isGlobal: boolean("is_global").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.intentId, t.stateId] }),
  }),
);

export const intentsToStatesRelations = relations(
  intentsToStates,
  ({ one }) => ({
    intent: one(intents, {
      fields: [intentsToStates.intentId],
      references: [intents.id],
    }),
    state: one(states, {
      fields: [intentsToStates.stateId],
      references: [states.id],
    }),
  }),
);
