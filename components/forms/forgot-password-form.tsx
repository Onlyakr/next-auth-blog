"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { forgotPasswordFormSchema } from "@/schemas/auth";
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

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  //   const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof forgotPasswordFormSchema>) {
    try {
      setIsLoading(true);
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: "/reset-password",
      });

      if (error) {
        toast.error(error.message || "Something went wrong");
      } else {
        toast.success("Check your email for a password reset link");
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
        <CardTitle>Forgot your password?</CardTitle>
        <CardDescription>
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
export default ForgotPasswordForm;
