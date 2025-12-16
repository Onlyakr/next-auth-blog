import { redirect } from "next/navigation";
import PageWrapper from "@/components/page-wrapper";
import PostsList from "@/components/posts/post-list";
import { userHasPermission } from "@/dal/user/user-has-permission";

const Home = async () => {
	const { success } = await userHasPermission();
	if (!success) {
		redirect("/sign-in");
	}
	return (
		<PageWrapper>
			<div className="flex flex-col gap-8">
				<h1 className="font-medium text-2xl">Posts</h1>

				<PostsList />
			</div>
		</PageWrapper>
	);
};
export default Home;
