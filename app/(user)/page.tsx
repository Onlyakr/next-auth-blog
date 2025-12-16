import { redirect } from "next/navigation";
import PageWrapper from "@/components/page-wrapper";
import PostsList from "@/components/posts/post-list";
import { getUserSession } from "@/dal/user/get-user-session";

const Home = async () => {
	const session = await getUserSession();

	if (!session) {
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
