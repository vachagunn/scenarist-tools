import { type db as database } from "@/server/db";
import { states, statesHierarchy } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { asc, eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

const readPath = async (db: typeof database, id: string) => {
  const path: (typeof states.$inferSelect)[] = [];

  const findParentState = async (id: string) => {
    const stateHierarchy = await db.query.statesHierarchy.findFirst({
      where: (t, { eq }) => eq(t.childId, id),
      with: { parent: true },
      columns: {},
    });
    if (!stateHierarchy) return;
    path.push(stateHierarchy.parent);
    await findParentState(stateHierarchy.parent.id);
  };

  await findParentState(id);

  return path.reverse();
};

export const statesRouter = createTRPCRouter({
  read: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const state = await db.query.states.findFirst({
        where: (t, { eq }) => eq(t.id, id),
      });
      if (!state) throw new TRPCError({ code: "NOT_FOUND" });
      return state;
    }),
  readPath: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      return await readPath(db, id);
    }),
  readCurrentOwner: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const owner = await db.query.statesOwnersHistory.findFirst({
        where: (t, { eq }) => eq(t.stateId, id),
        orderBy: (t, { desc }) => desc(t.timestamp),
        columns: { ownerId: true },
      });
      return owner;
    }),
  readOwnersHistory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const ownersHistory = await db.query.statesOwnersHistory.findMany({
        where: (t, { eq }) => eq(t.stateId, id),
        orderBy: (t, { desc }) => desc(t.timestamp),
      });
      return ownersHistory;
    }),
  readChildren: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const children = await db
        .select({ id: statesHierarchy.childId })
        .from(statesHierarchy)
        .leftJoin(states, eq(statesHierarchy.childId, states.id))
        .where(eq(statesHierarchy.parentId, id))
        .orderBy(asc(states.title));
      return children;
    }),
  readActivators: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const intents = await db.query.intentsToStates.findMany({
        where: (t, { eq }) => eq(t.stateId, id),
        columns: { intentId: true, isGlobal: true },
      });
      const events = await db.query.eventsToStates.findMany({
        where: (t, { eq }) => eq(t.stateId, id),
        columns: { eventId: true, isGlobal: true },
      });
      return { intents, events };
    }),
  list: protectedProcedure
    .input(
      z.object({
        search: z.string().nullish(),
        limit: z.number().default(5),
        cursor: z.number().default(0),
        orderBy: z
          .object({
            field: createInsertSchema(states).keyof(),
            order: z.enum(["asc", "desc"]),
          })
          .default({ field: "title", order: "asc" }),
      }),
    )
    .query(
      async ({ ctx: { db }, input: { limit, cursor, orderBy, search } }) => {
        const items = await db.query.states.findMany({
          limit: limit + 1,
          offset: cursor * limit,
          orderBy: (t, o) => o[orderBy.order](t[orderBy.field]),
          where: (t, { notExists, and, ilike }) =>
            and(
              notExists(
                db
                  .select()
                  .from(statesHierarchy)
                  .where(eq(t.id, statesHierarchy.childId)),
              ),
              search ? ilike(t.title, `%${search}%`) : undefined,
            ),
          with: {
            theme: {
              with: {
                project: true,
              },
            },
          },
        });

        const getNextCursor = () => {
          if (items.length > limit) {
            items.pop();
            return cursor + 1;
          }
          return undefined;
        };

        const nextCursor = getNextCursor();

        return { items, nextCursor };
      },
    ),
});
