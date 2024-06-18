import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { meRouter } from "./me";

export const usersRouter = createTRPCRouter({
  me: meRouter,
  read: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const user = await db.query.users.findFirst({
        where: (t, { eq }) => eq(t.id, id),
      });
      if (!user) throw new TRPCError({ code: "NOT_FOUND" });
      return user;
    }),
});
