function PostList({ posts, likePost, deletePost }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-box">
          <div className="post-header">
            <strong>{post.username}</strong>
            <span className="time">{post.time}</span>
          </div>

          <p>{post.content}</p>
          <button onClick={() => likePost(post.id)}>❤️ {post.likes}</button>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default PostList;
