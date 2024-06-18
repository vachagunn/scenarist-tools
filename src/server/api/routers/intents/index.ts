import { intents, intentsHierarchy } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";

const intentProcedure = publicProcedure
  .input(z.object({ id: z.string() }))
  .use(async ({ ctx, input: { id }, next }) => {
    const { db } = ctx;
    const intent = await db.query.intents.findFirst({
      where: (t, { eq }) => eq(t.id, id),
    });
    if (!intent) throw new TRPCError({ code: "NOT_FOUND" });
    return next({ ctx: { ...ctx, intent } });
  });

export const intentsRouter = createTRPCRouter({
  read: protectedProcedure
    .unstable_concat(intentProcedure)
    .query(async ({ ctx: { intent } }) => {
      return intent;
    }),
  readActivates: protectedProcedure
    .input(z.object({ id: z.string() }))
    .unstable_concat(intentProcedure)
    .query(async ({ ctx: { db, intent } }) => {
      const activates = await db.query.intentsToStates.findMany({
        where: (t, { eq }) => eq(t.intentId, intent.id),
        columns: { stateId: true, isGlobal: true },
      });
      return activates;
    }),
  readChildren: protectedProcedure
    .input(z.object({ id: z.string() }))
    .unstable_concat(intentProcedure)
    .query(
      async ({
        ctx: {
          db,
          intent: { id },
        },
      }) => {
        const children = await db
          .select({
            id: intentsHierarchy.childId,
          })
          .from(intentsHierarchy)
          .leftJoin(intents, eq(intentsHierarchy.childId, intents.id))
          .where(eq(intentsHierarchy.parentId, id))
          .orderBy(asc(intents.title));
        return children;
      },
    ),
  setName: protectedProcedure
    .unstable_concat(intentProcedure)
    .input(z.object({ name: z.string() }))
    .mutation(
      async ({
        ctx: {
          intent: { id },
          db,
        },
        input: { name },
      }) => {
        const [intent] = await db
          .update(intents)
          .set({ name })
          .where(eq(intents.id, id))
          .returning();
        if (!intent) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return intent;
      },
    ),
});
