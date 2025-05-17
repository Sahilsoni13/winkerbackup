import { z } from "zod";

export const profileSchema = z.object({
    firstName: z.string().nonempty("Enter Your FirstName"),
    lastName: z.string().nonempty("Enter Your LastName"),
    profilePictureUrl: z.string().nonempty("Please upload a profile image"), // Add this line
})