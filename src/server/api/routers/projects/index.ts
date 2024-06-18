import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const projectsRouter = createTRPCRouter({
  read: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx: { db }, input: { id } }) => {
      const project = await db.query.projects.findFirst({
        where: (t, { eq }) => eq(t.id, id),
      });
      if (!project) throw new TRPCError({ code: "NOT_FOUND" });
      return project;
    }),
});
