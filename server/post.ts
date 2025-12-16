"use server";

import { revalidatePath } from "next/cache";
import slugify from "slugify";
import type z from "zod";
import { getUserSession } from "@/dal/user/get-user-session";
import prisma from "@/lib/prisma";
import { createPostSchema } from "@/schemas/post";

export const createPost = async (data: z.infer<typeof createPostSchema>) => {
	try {
		const session = await getUserSession();
		if (!session) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}
		const userId = session.user.id;

		const {
			success,
			error,
			data: parsedData,
		} = createPostSchema.safeParse(data);

		if (!success) {
			return {
				success: false,
				message: error?.message || "Invalid data",
			};
		}

		const slug = slugify(parsedData.title, {
			lower: true,
			strict: true,
		}) as string;

		const createdPost = await prisma.post.create({
			data: {
				title: parsedData.title,
				content: parsedData.content,
				categoryId: parsedData.categoryId,
				authorId: userId,
				slug,
			},
		});

		revalidatePath("/");

		return {
			success: true,
			message: "Post created successfully.",
			data: createdPost,
		};
	} catch (error) {
		const e = error as Error;
		console.error(e.message);
		return {
			success: false,
			message: e.message || "Failed to create post",
		};
	}
};
