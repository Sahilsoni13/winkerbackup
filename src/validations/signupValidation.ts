import { z } from "zod";

/**
 * Zod schema for validating signup form data
 * @type {z.ZodObject<{
*   name: z.ZodString,
*   email: z.ZodString,
*   phone: z.ZodString,
*   password: z.ZodString,
*   confirmPassword: z.ZodString
* }>}
*/
export const signupSchema = z.object({
    name: z.string()
        .nonempty("Name is required")
        .min(2, "Name must be at least 2 characters"),
    email: z.string()
        .nonempty("Email is required")
        .email("Please enter a valid email"),
    phone: z.string()
        .nonempty("Phone number is required"),
    password: z.string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
        .nonempty("Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});