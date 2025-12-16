import z from "zod";

export const createPostSchema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
	// image: z.file().mime(["image/png", "image/jpeg", "image/jpg"]).optional(),
	imageUrl: z.string().optional(),
	categoryId: z.string().min(1, "Category is required"),
});
