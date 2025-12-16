import CreatePostForm from "@/components/forms/create-post-form";
import PageWrapper from "@/components/page-wrapper";

const CreatePost = () => (
	<PageWrapper>
		<div className="flex h-full items-center justify-center">
			<CreatePostForm />
		</div>
	</PageWrapper>
);
export default CreatePost;
