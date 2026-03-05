import PostInput from "./PostInput";
import PostList from "./Postlist";

function Feed({ addPost, posts, deletePost, likePost }) {
  return (
    <div className="feed">
      <div className="feed-header">
        <h3>Home</h3>
      </div>

      <PostInput addPost={addPost}/>
      <PostList posts={posts}
      deletePost={deletePost}
      likePost={likePost}/>
    </div>

  );
}


export default Feed;
