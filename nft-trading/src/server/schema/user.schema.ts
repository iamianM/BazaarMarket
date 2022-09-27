import z from 'zod';

export const inputUserSchema = z.object({
    id: z.string().min(1),
})