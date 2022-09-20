import z from 'zod';

export const createNFTSchema = z.object({
    tokenId: z.string().min(1),
    contractAddress: z.string().min(1),
    name: z.string().min(1),
    image: z.string().nullable(),
    swapRequestIDTaker: z.string(),
    swapRequestIDMaker: z.string(),
})

export type CreateNFTInput = z.TypeOf<typeof createNFTSchema>;
