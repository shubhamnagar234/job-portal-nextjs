import { z } from "zod";

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be atleast two characters long")
    .max(255, "Name must not exceed 255 characters"),

  userName: z
    .string()
    .trim()
    .min(3, "Username must be atleast three characters long")
    .max(255, "Username must not exceed 255 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),

  email: z
    .email("Please enter a valid email address")
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  password: z
    .string()
    .min(8, "Password must be atleast 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),

  role: z
    .enum(["applicant", "employer"], {
      error: "Role must be either 'applicant' or 'employer'",
    })
    .default("applicant"),
});

// z.infer automatically creates a TypeScript type from your Zod Schema
export type RegisterUserData = z.infer<typeof registerUserSchema>;

// Optional: Create a schema with password confirmation  - in server we don't need confirm password
export const registerUserSchemaWithConfirmPassword = registerUserSchema
  .extend({
    confirmPassword: z
      .string()
      .min(8, "Password must be atleast 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterUserDataWithConfirmPassword = z.infer<
  typeof registerUserSchemaWithConfirmPassword
>;

export const loginUserSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .trim()
    .max(255, "Email must not exceed 255 characters")
    .toLowerCase(),

  password: z.string().min(8, "Password must be atleast 8 characters long"),
});

export type LoginUserData = z.infer<typeof loginUserSchema>;
