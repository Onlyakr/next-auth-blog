import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import PasswordResetEmail from "@/components/emails/reset-email";
import EmailVerification from "@/components/emails/verification-email";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "Blogbog <onboarding@resend.dev>",
        to: [user.email],
        subject: "Verify your email address",
        react: EmailVerification({
          userEmail: user.email,
          verificationLink: url,
        }),
      });
    },
    sendOnSignUp: true,
  },

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Blogbog <onboarding@resend.dev>",
        to: [user.email],
        subject: "Reset your password",
        react: PasswordResetEmail({
          userEmail: user.email,
          resetLink: url,
          expirationTime: "1 hour",
        }),
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
});
