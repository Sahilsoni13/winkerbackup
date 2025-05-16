import { z } from "zod";

/**
 * Type definition for the login form data, inferred from the loginSchema
 * @typedef {Object} LoginFormData
 * @property {string} email - User's email address
 * @property {string} password - User's password
 */
type LoginFormData = z.infer<typeof SignupSchema>;

/**
 * Zod schema for validating login form data
 * @type {z.ZodObject<{
*   email: z.ZodString,
*   password: z.ZodString
* }>}
*/
export const SignupSchema = z.object({
    email: z.string()
        .nonempty("Email is required")
        .email("Please enter a valid email"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
});

