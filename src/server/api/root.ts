import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { authRouter } from "./routers/auth";
import { eventsRouter } from "./routers/events";
import { intentsRouter } from "./routers/intents";
import { projectsRouter } from "./routers/projects";
import { scenaristsRouter } from "./routers/scenarists";
import { statesRouter } from "./routers/states";
import { themesRouter } from "./routers/themes";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  users: usersRouter,
  scenarists: scenaristsRouter,
  projects: projectsRouter,
  themes: themesRouter,
  states: statesRouter,
  intents: intentsRouter,
  events: eventsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
