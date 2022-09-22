import z from 'zod';

export const createSwapSchema = z.object({
    addressMaker: z.string().min(1),
    addressTaker: z.string().min(1),
})

export const createSwapOutputSchema = z.object({
    id: z.string().min(1),
})

export const insertSwapIdSchema = z.object({
    id: z.string().min(1),
    swapId: z.string().min(1),
})

export const getMakerSwapsSchema = z.object({
    addressMaker: z.string().min(1),
    closed: z.boolean().optional(),
})

export const getTakerSwapsSchema = z.object({
    addressTaker: z.string().min(1),
    closed: z.boolean().optional(),
})

export const closeSwapSchema = z.object({
    id: z.string().min(1),
})