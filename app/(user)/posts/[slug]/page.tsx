import { notFound } from "next/navigation";
import { toast } from "sonner";
import PageWrapper from "@/components/page-wrapper";
import PostCard from "@/components/posts/post-card";
import { getPostBySlug } from "@/dal/post/get-post-by-slug";

const Post = async ({ params }: { params: { slug: string } }) => {
	const { slug } = await params;
	const { success, message, data: post } = await getPostBySlug(slug);

	if (!success) {
		toast.error(message || "Failed to fetch post");
		notFound();
	}

	if (!post) {
		return <div>Post not found.</div>;
	}

	return (
		<PageWrapper>
			<div className="flex h-full flex-col items-center justify-center">
				<PostCard post={post} />
			</div>
		</PageWrapper>
	);
};
export default Post;
