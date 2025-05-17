import { z } from "zod";

export const profileSchema = z.object({
    email: z.string().email("Enter valid Email").nonempty("Email is Required"),
    firstName: z.string().nonempty("Enter Your FirstName"),
    lastName: z.string().nonempty("Enter Your LastName"),
    profilePictureUrl: z.string().nonempty("Please upload a profile image"), // Add this line
})