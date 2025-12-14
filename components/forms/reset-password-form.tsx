"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { resetPasswordFormSchema } from "@/schemas/auth";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordFormSchema>) {
    try {
      setIsLoading(true);

      const token = new URLSearchParams(window.location.search).get("token");

      if (token) {
        const { error } = await authClient.resetPassword({
          newPassword: data.password,
          token,
        });

        if (error) {
          toast.error(error.message || "Something went wrong");
        } else {
          toast.success(" Password reset successful");
          router.push("/sign-in");
        }
      } else {
        toast.error("Invalid token");
      }
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
                    Resetting password...
                  </div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};
export default ResetPasswordForm;
