import { createSwapSchema, insertSwapIdSchema } from "../schema/swap.schema"
import { createRouter } from "./context"
import * as trpc from "@trpc/server"

export const swapRouter = createRouter()
    .mutation('create-swap', {
        input: createSwapSchema,
        async resolve({ ctx, input }) {
            const swap = await ctx.prisma.swapRequest.create({
                data: {
                    ...input,
                },
            })
            return swap
        }
    })
    .mutation('insert-swapId', {
        input: insertSwapIdSchema,
        async resolve({ ctx, input }) {
            const swap = await ctx.prisma.swapRequest.update({
                where: {
                    id: input.id,
                },
                data: {
                    swapId: input.swapId,
                },
            })
            return swap
        }
    })
