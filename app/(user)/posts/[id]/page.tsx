const Post = ({ params }: { params: { id: string } }) => (
  <div>Post {params.id}</div>
);
export default Post;
