import { sessionHandler } from "@/server/auth/session";
import { createTRPCRouter, internalProcedure } from "../../trpc";

export const authRouter = createTRPCRouter({
  session: internalProcedure.mutation(sessionHandler),
});
