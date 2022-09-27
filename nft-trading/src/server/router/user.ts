import { inputUserSchema } from "../schema/user.schema"
import { createRouter } from "./context"

export const userRouter = createRouter()
    .mutation('update-claim', {
        input: inputUserSchema,
        async resolve({ ctx, input }) {
            const user = await ctx.prisma.user.update({
                where: {
                    id: input.id,
                },
                data: {
                    hasClaimedBooster: true
                },
            })
            return user
        }
    })
    .query('get-user', {
        input: inputUserSchema,
        resolve({ ctx, input }) {
            const user = ctx.prisma.user.findUnique({
                where: {
                    id: input.id,
                }
            })
            return user
        }
    })