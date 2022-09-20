import { createNFTSchema } from "../schema/nft.schema"
import { createRouter } from "./context"
import * as trpc from "@trpc/server"

export const nftRouter = createRouter()
    .mutation('create-nft', {
        input: createNFTSchema,
        async resolve({ ctx, input }) {
            const nft = await ctx.prisma.nft.create({
                data: {
                    tokenId: input.tokenId,
                    contractAddress: input.contractAddress,
                    name: input.name,
                    image: input?.image,
                    swapRequestTaker: {
                        connect: {
                            id: input?.swapRequestIDTaker,
                        }
                    },
                    swapRequestMaker: {
                        connect: {
                            id: input?.swapRequestIDMaker,
                        }
                    },
                }
            })
            return nft
        }
    })
