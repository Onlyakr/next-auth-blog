import z from "zod";

export const signUpFormSchema = z
	.object({
		name: z.string().min(1, "Name is required"),
		email: z.email("Invalid email").min(1, "Email is required"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().min(6, "Confirm password is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const signInFormSchema = z.object({
	email: z.email("Invalid email").min(1, "Email is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordFormSchema = z.object({
	email: z.email("Invalid email").min(1, "Email is required"),
});

export const resetPasswordFormSchema = z
	.object({
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string().min(6, "Confirm password is required"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
