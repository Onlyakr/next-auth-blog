import { redirect } from "next/navigation";
import CreatePostForm from "@/components/forms/create-post-form";
import PageWrapper from "@/components/page-wrapper";
import { userHasPermission } from "@/dal/user/user-has-permission";

const CreatePost = async () => {
	const { success } = await userHasPermission();
	if (!success) {
		redirect("/sign-in");
	}
	return (
		<PageWrapper>
			<div className="flex h-full items-center justify-center">
				<CreatePostForm />
			</div>
		</PageWrapper>
	);
};
export default CreatePost;
