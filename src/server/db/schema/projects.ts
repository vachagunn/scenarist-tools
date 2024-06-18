import { relations } from "drizzle-orm";
import { varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulidx";
import { createTable } from "./create-table";
import { events } from "./events";
import { intents } from "./intents";
import { themes } from "./themes";

export const projects = createTable("projects", {
  id: varchar("id").primaryKey().$defaultFn(ulid),
  title: varchar("title").unique().notNull(),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  themes: many(themes),
  intents: many(intents),
  events: many(events),
}));
