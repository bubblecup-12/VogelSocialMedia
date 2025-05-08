// src/schemas/userSchemas.ts
import { z } from "zod";

export const userRegistrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});
// DTO-Typen aus den Schemas ableiten
export type UserRegistrationDto = z.infer<typeof userRegistrationSchema>;
export type UserLoginDto = z.infer<typeof userLoginSchema>;
