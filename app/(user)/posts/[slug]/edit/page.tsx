import { notFound, redirect } from "next/navigation";
import { toast } from "sonner";
import EditPostForm from "@/components/forms/edit-post-form";
import PageWrapper from "@/components/page-wrapper";
import { getPostBySlug } from "@/dal/post/get-post-by-slug";
import { userHasPermission } from "@/dal/user/user-has-permission";

const EditPost = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { success } = await userHasPermission();
	if (!success) {
		redirect("/sign-in");
	}

	const { slug } = await params;
	const {
		success: postSuccess,
		message: postMessage,
		data: post,
	} = await getPostBySlug(slug);

	if (!postSuccess) {
		toast.error(postMessage || "Failed to fetch post");
		notFound();
	}

	console.log(post);

	return (
		<PageWrapper>
			<div className="flex h-full flex-col gap-8">
				<h1 className="font-bold text-2xl">Edit Post</h1>
				<div className="flex justify-center">
					<EditPostForm post={post} />
				</div>
			</div>
		</PageWrapper>
	);
};

export default EditPost;
