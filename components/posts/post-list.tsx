import { notFound } from "next/navigation";
import { toast } from "sonner";
import { getPosts } from "@/dal/post/get-posts";
import PostCard from "./post-card";

const PostsList = async () => {
	const { success, message, data: posts } = await getPosts();

	if (!success) {
		toast.error(message || "Failed to fetch posts");
		notFound();
	}

	if (!posts) {
		return <div>No posts found.</div>;
	}

	return (
		<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<li key={post.id}>
					<PostCard post={post} />
				</li>
			))}
		</ul>
	);
};
export default PostsList;
