import z from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Minimum 6 characters" }),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

export const adminRegisterSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
  profilePicture: z.string().url("Invalid URL format").optional().or(z.literal("")),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type AdminRegisterData = z.infer<typeof adminRegisterSchema>;