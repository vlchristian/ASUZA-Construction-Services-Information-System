import * as z from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 charachters"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be 8 characters and above"),
    confirmPassword: z.string(),
    fullName: z.string().min(2, "Please enter your name")
  }).refine((data) => data.password !== data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"],
  });