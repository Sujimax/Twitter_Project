import { useState } from "react";

function TweetBox({ addPost }) {
  const [input, setInput] = useState("");

  function handlePost() {
    if (input.trim() === "") return;

    addPost(input);
    setInput("");
  }

  return (
    <div className="tweetBox">
      <input
        type="text"
        placeholder="What's happening?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handlePost}>Post</button>
    </div>
  );
}

export default TweetBox;