import z from "zod";


export const PersonalInfoSchema = z.object({
    name: z.string().min(1,"This field is required"),
    email: z.string().min(1,"This field is required").email("Invalid Email"),
    phone: z.string().min(1,"This field is required"),
});

export const PlanSchema = z.object({
    plan: z.string().min(1),
});