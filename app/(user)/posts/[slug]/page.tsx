import { redirect } from "next/navigation";
import PageWrapper from "@/components/page-wrapper";
import PostDetail from "@/components/posts/post-detail";
import { userHasPermission } from "@/dal/user/user-has-permission";

const Post = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { success } = await userHasPermission();
	if (!success) {
		redirect("/sign-in");
	}
	return (
		<PageWrapper>
			<div className="flex h-full flex-col gap-8">
				<h1 className="font-bold text-2xl">Post Detail</h1>
				<div className="flex justify-center">
					<PostDetail params={params} />
				</div>
			</div>
		</PageWrapper>
	);
};

export default Post;
