import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { userHasPermission } from "../user/user-has-permission";

export const getPosts = async () => {
	try {
		const { success } = await userHasPermission();
		if (!success) {
			redirect("/sign-in");
		}

		const posts = await prisma.post.findMany({
			include: {
				author: true,
				category: true,
			},
		});

		return {
			success: true,
			message: "Posts fetched successfully.",
			data: posts,
		};
	} catch (error) {
		const e = error as Error;
		return {
			success: false,
			message: e.message || "Failed to fetch posts",
		};
	}
};
