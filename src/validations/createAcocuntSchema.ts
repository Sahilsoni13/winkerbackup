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
export const createAcocuntSchema = z.object({
    dob: z.object({
        day: z.string().regex(/^(0?[1-9]|[12][0-9]|3[01])$/, "Invalid day"),
        month: z.string().regex(/^(0?[1-9]|1[0-2])$/, "Invalid month"),
        year: z.string().regex(/^(19[0-9]{2}|20[0-1][0-9]|202[0-5])$/, "Invalid year"),
    }),
    gender: z.enum(['Male', 'Female', 'Non Binary'], {
        required_error: "Gender is required"
    }),
    aura: z.string().nonempty("Please Enter Your Aura")
});