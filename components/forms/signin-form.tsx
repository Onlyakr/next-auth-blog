"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { signInFormSchema } from "@/schemas/auth";
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

const SignInForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof signInFormSchema>) {
		try {
			setIsLoading(true);
			await authClient.signIn.email(
				{
					email: data.email,
					password: data.password,
				},
				{
					onSuccess: () => {
						toast.success("Signed in successfully");
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
				<CardTitle>Welcome back</CardTitle>
				<CardDescription>Sign in to your account</CardDescription>
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
									<div className="flex justify-between gap-4">
										<FieldLabel htmlFor="password">Password</FieldLabel>
										<Link
											className="text-muted-foreground"
											href="/forgot-password"
										>
											Forgot your password?
										</Link>
									</div>
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
						<Field>
							<Button disabled={isLoading} type="submit">
								{isLoading ? (
									<div className="flex items-center gap-2">
										<Spinner />
										Signing in...
									</div>
								) : (
									"Sign In"
								)}
							</Button>
							<FieldDescription className="text-right">
								Don&apos;t have an account?
								<Link className="ml-2" href="/sign-up">
									Sign up
								</Link>
							</FieldDescription>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
};
export default SignInForm;
