import { relations } from "drizzle-orm";
import { unique, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { createTable } from "./create-table";
import { projects } from "./projects";
import { states } from "./states";

export const themes = createTable(
  "themes",
  {
    id: varchar("id").primaryKey().$defaultFn(ulid),
    title: varchar("title").notNull(),
    projectId: varchar("project_id")
      .references(() => projects.id)
      .notNull(),
  },
  (t) => ({
    unq: unique().on(t.title, t.projectId),
  }),
);

export const themesRelations = relations(themes, ({ many, one }) => ({
  project: one(projects, {
    fields: [themes.projectId],
    references: [projects.id],
  }),
  states: many(states),
}));
