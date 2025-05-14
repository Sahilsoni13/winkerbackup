import { z } from "zod";

/**
 * Type definition for the login form data, inferred from the loginSchema
 * @typedef {Object} LoginFormData
 * @property {string} email - User's email address
 * @property {string} password - User's password
 */
type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Zod schema for validating login form data
 * @type {z.ZodObject<{
*   email: z.ZodString,
*   password: z.ZodString
* }>}
*/
export const loginSchema = z.object({
    email: z.string()
        .nonempty("Email is required")
        .email("Please enter a valid email"),
    password: z.string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters"),
});

