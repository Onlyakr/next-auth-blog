"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";
import type { Category } from "@/lib/generated/prisma/client";
import { createPostSchema } from "@/schemas/post";
import { createPost } from "@/server/post";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";

const CreatePostForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await fetch("/api/categories");
			const data = await response.json();
			setCategories(data);
		};
		fetchCategories();
	}, []);

	const form = useForm<z.infer<typeof createPostSchema>>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: "",
			content: "",
			imageUrl: "",
			categoryId: "",
		},
	});

	async function onSubmit(data: z.infer<typeof createPostSchema>) {
		try {
			setIsLoading(true);
			const { success, message } = await createPost(data);
			if (success) {
				toast.success(message);
				router.push("/");
			} else {
				toast.error(message);
			}
		} catch (error) {
			const e = error as Error;
			console.error(e.message);
			toast.error(e.message || "Failed to create post");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Create a new post</CardTitle>
				<CardDescription>
					Create a new post to share with the world
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							control={form.control}
							name="title"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="title">Title</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id="title"
										placeholder="Title"
										type="text"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							control={form.control}
							name="content"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="content">Content</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id="content"
										placeholder="Content"
										type="text"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							control={form.control}
							name="imageUrl"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="imageUrl">Image</FieldLabel>
									<Input
										{...field}
										aria-invalid={fieldState.invalid}
										id="imageUrl"
										placeholder="Image"
										type="file"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Controller
							control={form.control}
							name="categoryId"
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="categoryId">Category</FieldLabel>
									<Select
										name={field.name}
										onValueChange={field.onChange}
										value={field.value}
									>
										<SelectTrigger
											aria-invalid={fieldState.invalid}
											id="categoryId"
										>
											<SelectValue>
												{categories.find(
													(category) => category.id === field.value
												)?.name || "Select a category"}
											</SelectValue>
										</SelectTrigger>
										<SelectContent alignItemWithTrigger={false}>
											<SelectItem value="">Select a category</SelectItem>
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
						<Field orientation="horizontal">
							<Button
								className="w-1/2"
								onClick={() => form.reset()}
								variant="destructive"
							>
								Reset
							</Button>
							<Button className="w-1/2" disabled={isLoading} type="submit">
								{isLoading ? (
									<div className="flex items-center gap-2">
										<Spinner />
										Creating post...
									</div>
								) : (
									"Create Post"
								)}
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	);
};
export default CreatePostForm;
