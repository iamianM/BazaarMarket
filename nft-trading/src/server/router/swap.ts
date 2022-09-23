import { createSwapSchema, createSwapOutputSchema, insertSwapIdSchema, getMakerSwapsSchema, getTakerSwapsSchema, closeSwapSchema } from "../schema/swap.schema"
import { createRouter } from "./context"
import * as trpc from "@trpc/server"

export const swapRouter = createRouter()
    .mutation('create-swap', {
        input: createSwapSchema,
        output: createSwapOutputSchema,
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
    .query('get-maker-swaps', {
        input: getMakerSwapsSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.swapRequest.findMany({
                where: {
                    addressMaker: input.addressMaker,
                    accepted: null,
                    declined: null
                },
                include: {
                    NFTMaker: true,
                    NFTTaker: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            })
        }
    })
    .query('get-maker-accepted-swaps', {
        input: getMakerSwapsSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.swapRequest.findMany({
                where: {
                    addressMaker: input.addressMaker,
                    accepted: true,
                    declined: null
                },
                include: {
                    NFTMaker: true,
                    NFTTaker: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            })
        }
    })
    .query('get-maker-declined-swaps', {
        input: getMakerSwapsSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.swapRequest.findMany({
                where: {
                    addressMaker: input.addressMaker,
                    accepted: null,
                    declined: true
                },
                include: {
                    NFTMaker: true,
                    NFTTaker: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            })
        }
    })
    .query('get-taker-swaps', {
        input: getTakerSwapsSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.swapRequest.findMany({
                where: {
                    addressTaker: input.addressTaker,
                    accepted: null,
                    declined: null
                },
                include: {
                    NFTMaker: true,
                    NFTTaker: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            })
        }
    })
    .query('get-taker-accepted-swaps', {
        input: getTakerSwapsSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.swapRequest.findMany({
                where: {
                    addressTaker: input.addressTaker,
                    accepted: true,
                    declined: null
                },
                include: {
                    NFTMaker: true,
                    NFTTaker: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            })
        }
    })
    .query('get-taker-declined-swaps', {
        input: getTakerSwapsSchema,
        resolve({ ctx, input }) {
            return ctx.prisma.swapRequest.findMany({
                where: {
                    addressTaker: input.addressTaker,
                    accepted: null,
                    declined: true
                },
                include: {
                    NFTMaker: true,
                    NFTTaker: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            })
        }
    })
    .mutation('accept-swap', {
        input: closeSwapSchema,
        async resolve({ ctx, input }) {
            const swap = await ctx.prisma.swapRequest.update({
                where: {
                    id: input.id,
                },
                data: {
                    accepted: true,
                },
            })
            return swap
        }
    })
    .mutation('decline-swap', {
        input: closeSwapSchema,
        async resolve({ ctx, input }) {
            const swap = await ctx.prisma.swapRequest.update({
                where: {
                    id: input.id,
                },
                data: {
                    declined: true,
                },
            })
            return swap
        }
    })
    .query('get-latest-swap', {
        resolve({ ctx }) {
            return ctx.prisma.swapRequest.findFirst({
                orderBy: {
                    createdAt: 'desc',
                }
            })
        }
    })
