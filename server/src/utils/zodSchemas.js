import { z } from 'zod';

export const adminSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters long.' }).max(50, { message: 'Username must be at most 50 characters long.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }).max(50, { message: 'Password must be at most 50 characters long.' })
});

export const formSchema = z.object({
    name: z.string().min(1, { message: "Please enter your name" }).max(50, { message: "Name must be at most 50 characters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }).max(50, { message: "Email must be at most 50 characters long" }),
    phoneNumber: z.string().min(10, { message: "Please enter your phone number" }).max(12, { message: "Please enter a valid phone number" }),
    department: z.enum(['Tech', 'Design', 'Management'], { message: "Please select a department" }),
    futureVision: z.string().min(1, { message: "Please answer all the questions" }).max(1000, { message: "Maximum 1000 characters allowed in a field" }),
    projectLinks: z.string().max(1000, { message: "Maximum 1000 characters allowed in a field" }),
    videoGame: z.string().min(1, { message: "Please answer all the questions" }).max(1000, { message: "Maximum 1000 characters allowed in a field" })
});