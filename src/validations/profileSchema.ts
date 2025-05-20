import { z } from "zod";

export const profileSchema = z.object({
    profilePictureUrl: z.string().nonempty("Please upload a profile image"), // Add this line
})