import { useState } from "react";

function PostInput({ addPost }) {

  const [text, setText] = useState("");

  const handleSubmit = () => {

    if (text.trim() === "") return;

    addPost(text);
    setText("");
  };

  return (
    <div className="post-input">

      <input
        placeholder="What's happening?"
        value={text}
        maxLength={280}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="post-bottom">

        <span>{text.length} / 280</span>

        <button onClick={handleSubmit}>
          Post
        </button>

      </div>

    </div>
  );
}

export default PostInput;