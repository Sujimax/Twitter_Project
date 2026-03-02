import { useState } from "react";

function Post({ username, message, time }) {
  const [likes, setLikes] = useState(0);

  return (
    <div className="post">
      <div className="postHeader">
        <strong>{username}</strong>
        <span style={{ marginLeft: "10px", color: "gray" }}>
          {time}
        </span>
      </div>

      <p>{message}</p>

      <button onClick={() => setLikes(likes + 1)}>
        ❤️ {likes}
      </button>
    </div>
  );
}

export default Post;