import { z } from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email format").trim().toLowerCase(),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .max(72, "Password is too long"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email format").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

// Optional inferred types for service/controller signatures
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;