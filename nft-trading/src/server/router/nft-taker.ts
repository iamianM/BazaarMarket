import { createNFTSchema } from "../schema/nft.schema"
import { createRouter } from "./context"
import * as trpc from "@trpc/server"

export const nftTakerRouter = createRouter()
    .mutation('create-nft', {
        input: createNFTSchema,
        async resolve({ ctx, input }) {
            const nft = await ctx.prisma.nftTaker.create({
                data: {
                    tokenId: input.tokenId,
                    contractAddress: input.contractAddress,
                    name: input?.name,
                    image: input?.image,
                    swapRequest: {
                        connect: {
                            id: input.swapRequestId,
                        }
                    },
                }
            })
            return nft
        }
    })
