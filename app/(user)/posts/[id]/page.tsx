const Post = ({ params }: { params: { id: string } }) => {
	return <div>Post {params.id}</div>;
};
export default Post;
