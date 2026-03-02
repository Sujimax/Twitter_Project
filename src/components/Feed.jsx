import { useState } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";

function Feed() {
  const [posts, setPosts] = useState([
    {
      username: "Sujithra",
      message: "Welcome to my Mini Twitter app ",
      time: "Just now",
    },
    {
      username: "React Dev",
      message: "Learning MERN stack step by step ",
      time: "5 mins ago",
    },
  ]);

  function addPost(newMessage) {
    const newPost = {
      username: "You",
      message: newMessage,
      time: "Just now",
    };

    setPosts([newPost, ...posts]);
  }

  return (
    <div className="feed">
      <div className="feedHeader">
        <h2>Home</h2>
      </div>

      <TweetBox addPost={addPost} />

      {posts.map((post, index) => (
        <Post
          key={index}
          username={post.username}
          message={post.message}
          time={post.time}
        />
      ))}
    </div>
  );
}

export default Feed;