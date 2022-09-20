// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { protectedExampleRouter } from "./protected-example-router";
import { nftRouter } from "./nft";


export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", protectedExampleRouter)
  .merge("nft.", nftRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
