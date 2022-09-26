import z from 'zod';

export const createNFTSchema = z.object({
    tokenId: z.string().min(1),
    contractAddress: z.string().min(1),
    name: z.string(),
    image: z.string(),
    description: z.string(),
    swapRequestId: z.string().min(1),
})

export type CreateNFTInput = z.TypeOf<typeof createNFTSchema>;
