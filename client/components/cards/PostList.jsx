import Post from "./Post";

const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
}) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
            post={post}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
          />
        ))}
    </>
  );
};

export default PostList;
