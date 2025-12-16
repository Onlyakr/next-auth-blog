import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { userHasPermission } from "../user/user-has-permission";

export const getPostBySlug = async (slug: string) => {
	try {
		const { success } = await userHasPermission();
		if (!success) {
			redirect("/sign-in");
		}

		const post = await prisma.post.findUnique({
			where: { slug },
			include: {
				author: true,
				category: true,
			},
		});

		if (!post) {
			return { success: false, message: "Post not found." };
		}

		return { success: true, message: "Post fetched successfully.", data: post };
	} catch (error) {
		const e = error as Error;
		console.error(e.message);
		return { success: false, message: "Fail to fetch post by slug." };
	}
};
