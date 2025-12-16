"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { signUpFormSchema } from "@/schemas/auth";
import GoogleSigninButton from "../google-signin-button";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

const SignUpForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: z.infer<typeof signUpFormSchema>) {
		try {
			setIsLoading(true);
			await authClient.signUp.email(
				{
					name: data.name,
					email: data.email,
					password: data.password,
				},
				{
					onSuccess: () => {
						toast.success("Signed up successfully");
						router.push("/");
					},
					onError: (ctx) => {
						toast.error(ctx.error.message);
					},
				}
			);
		} catch (error) {
			const e = error as Error;
			console.error(e.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Get started</CardTitle>
				<CardDescription>Create a new account</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Field>
							<GoogleSigninButton />
						</Field>
						<FieldSeparator>or</FieldSeparator>
						<Controller
							control={form.control}
							name="name"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="name">Name</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id="name"
										placeholder="John Doe"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							control={form.control}
							name="email"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="email">Email</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										autoComplete="off"
										id="email"
										placeholder="john@email.com"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							control={form.control}
							name="password"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id="password"
										placeholder="********"
										type="password"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							control={form.control}
							name="confirmPassword"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="confirmPassword">
										Confirm Password
									</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id="confirmPassword"
										placeholder="********"
										type="password"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Field>
							<Button className="cursor-pointer" type="submit">
								{isLoading ? (
									<div className="flex items-center gap-2">
										<Spinner />
										Signing Up...
									</div>
								) : (
									"Sign Up"
								)}
							</Button>
							<FieldDescription className="text-right">
								Already have an account?
								<Link className="ml-2" href="/sign-in">
									Sign In
								</Link>
							</FieldDescription>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
};
export default SignUpForm;
