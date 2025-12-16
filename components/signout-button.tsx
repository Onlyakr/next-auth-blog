"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const SignoutButton = ({
	className,
	variant = "ghost",
}: {
	className?: string;
	variant?:
		| "ghost"
		| "destructive"
		| "default"
		| "outline"
		| "secondary"
		| "link";
}) => {
	const router = useRouter();

	const handleClick = async () => {
		try {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						toast.success("Signed out successfully");
						router.push("/");
						router.refresh();
					},
					onError: (ctx) => {
						toast.error(ctx.error.message || "Failed to sign out");
					},
				},
			});
		} catch (error) {
			const e = error as Error;
			console.error(e.message || "Failed to sign out");
		}
	};

	return (
		<Button
			className={cn(className, "cursor-pointer")}
			onClick={handleClick}
			variant={variant}
		>
			Sign Out
		</Button>
	);
};
export default SignoutButton;
