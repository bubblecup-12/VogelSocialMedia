import { z } from "zod";

export const feedQuerySchema = z.object({
  createdAt: z.string().datetime().optional(),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((num) => num > 0 && num <= 30, {
      message: "Limit must be between 1 and 30",
    }),
});
