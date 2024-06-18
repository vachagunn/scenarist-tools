import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const eventsRouter = createTRPCRouter({
  read: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const event = await db.query.events.findFirst({
        where: (t, { eq }) => eq(t.id, id),
      });
      if (!event) throw new TRPCError({ code: "NOT_FOUND" });
      return event;
    }),
});
