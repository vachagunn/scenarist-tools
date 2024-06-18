import { themes } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const themesRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(5),
        page: z.number().default(0),
        orderBy: z
          .object({
            field: createInsertSchema(themes).keyof(),
            order: z.enum(["asc", "desc"]),
          })
          .default({ field: "title", order: "asc" }),
      }),
    )
    .query(async ({ ctx: { db }, input: { limit, page, orderBy } }) => {
      const themes = await db.query.themes.findMany({
        limit: limit,
        offset: limit * page,
        orderBy: (t, o) => o[orderBy.order](t[orderBy.field]),
        columns: { id: true },
      });
      return themes;
    }),
  read: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const theme = await db.query.themes.findFirst({
        where: (t, { eq }) => eq(t.id, id),
      });
      if (!theme) throw new TRPCError({ code: "NOT_FOUND" });
      return theme;
    }),
  readStates: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const theme = await db.query.themes.findFirst({
        where: (t, { eq }) => eq(t.id, id),
        with: { states: { columns: { id: true } } },
      });
      if (!theme) throw new TRPCError({ code: "NOT_FOUND" });

      const states = theme.states.map(({ id }) => id);
      return states;
    }),
});
