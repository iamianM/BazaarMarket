// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { protectedExampleRouter } from "./protected-example-router";
import { swapRouter } from "./swap";
import { nftMakerRouter } from "./nft-maker";
import { nftTakerRouter } from "./nft-taker";
import { userRouter } from "./user"


export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", protectedExampleRouter)
  .merge("nft-maker.", nftMakerRouter)
  .merge("nft-taker.", nftTakerRouter)
  .merge("swap.", swapRouter)
  .merge("user.", userRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
