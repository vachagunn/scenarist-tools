import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

import { statesOwnersHistory } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "drizzle-orm";

export const scenaristsRouter = createTRPCRouter({
  read: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const scenarist = await db.query.scenarists.findFirst({
        where: (t, { eq }) => eq(t.id, id),
      });
      if (!scenarist) throw new TRPCError({ code: "NOT_FOUND" });
      return scenarist;
    }),
  listOwnedStates: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const scenarist = await db.query.scenarists.findFirst({
        where: (t, { eq }) => eq(t.id, id),
      });
      if (!scenarist) throw new TRPCError({ code: "NOT_FOUND" });
      await db.query.statesOwnersHistory.findMany({
        where: (t, { eq }) => eq(t.ownerId, scenarist.id),
      });
      const latestOwners = db.$with("latest_owners").as(
        db
          .select({
            stateId: statesOwnersHistory.stateId,
            ownerId: statesOwnersHistory.ownerId,
            timestamp: statesOwnersHistory.timestamp,
            rowNumber:
              sql`ROW_NUMBER() OVER(PARTITION BY ${statesOwnersHistory.stateId} ORDER BY ${statesOwnersHistory.timestamp} DESC)`
                .mapWith(Number)
                .as("row_number"),
          })
          .from(statesOwnersHistory),
      );
      const ownedStates = await db
        .with(latestOwners)
        .select({
          stateId: latestOwners.stateId,
          timestamp: latestOwners.timestamp,
        })
        .from(latestOwners)
        .where(
          and(
            eq(latestOwners.rowNumber, 1),
            eq(latestOwners.ownerId, scenarist.id),
          ),
        );
      return ownedStates;
    }),
});
