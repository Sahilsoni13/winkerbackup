import { z } from "zod";

/**
 * Zod schema for form validation
 */
export const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address").nonempty("Email is required"),
});