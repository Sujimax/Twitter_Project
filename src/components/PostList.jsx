function PostList({ posts, likePost, deletePost }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-box">
          <p>{post.content}</p>
          <button onClick={() => likePost(post.id)}>❤️ {post.likes}</button>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PostList;
