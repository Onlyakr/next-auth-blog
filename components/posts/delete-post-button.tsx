"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { deletePost } from "@/server/post";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const DeletePostButton = ({
	className,
	slug,
}: {
	className?: string;
	slug: string;
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const handleDelete = async () => {
		try {
			setIsLoading(true);
			const { success, message } = await deletePost(slug);
			if (success) {
				toast.success(message);
				router.push("/");
			} else {
				toast.error(message);
			}
		} catch (error) {
			const e = error as Error;
			toast.error(e.message || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Button
			className={className}
			disabled={isLoading}
			onClick={handleDelete}
			variant="destructive"
		>
			{isLoading ? <Spinner /> : "Delete"}
		</Button>
	);
};
export default DeletePostButton;
