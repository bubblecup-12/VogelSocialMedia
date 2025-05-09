// src/schemas/userSchemas.ts
import { z } from "zod";

export const userRegistrationSchema = z.object({
  username: z.string().regex(/^\S*$/, "Username must not contain spaces"), // No whitespaces allowed,
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  username: z.string().regex(/^\S*$/, "Username must not contain spaces"), // No whitespaces allowed,
  password: z.string(),
});
// DTO-Typen aus den Schemas ableiten
export type UserRegistrationDto = z.infer<typeof userRegistrationSchema>;
export type UserLoginDto = z.infer<typeof userLoginSchema>;
