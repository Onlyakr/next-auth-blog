import { notFound } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getPostBySlug } from "@/dal/post/get-post-by-slug";
import { getUserSession } from "@/dal/user/get-user-session";
import DeletePostButton from "./delete-post-button";
import EditPostButton from "./edit-post-button";

const PostDetail = async ({
	params,
}: {
	params: Promise<{ slug: string }>;
}) => {
	const { slug } = await params;
	const { success, message, data: post } = await getPostBySlug(slug);
	const session = await getUserSession();
	const isOwner = session?.user.id === post?.authorId;

	if (!success) {
		toast.error(message || "Failed to fetch post");
		notFound();
	}

	if (!post) {
		return <div>Post not found.</div>;
	}

	return (
		<Card className="w-full max-w-xl">
			<CardHeader>
				<CardTitle>{post.title}</CardTitle>
				{isOwner && (
					<CardAction className="flex gap-2 max-sm:flex-col">
						<EditPostButton className="w-1/2 max-sm:w-full" slug={post.slug} />
						<DeletePostButton
							className="w-1/2 cursor-pointer max-sm:w-full"
							slug={post.slug}
						/>
					</CardAction>
				)}
				<CardDescription className="flex gap-2 max-sm:flex-col">
					<Badge>Category: {post.category.name}</Badge>
					<Badge>Author: {post.author.name}</Badge>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{post.content}</p>
			</CardContent>
		</Card>
	);
};
export default PostDetail;
