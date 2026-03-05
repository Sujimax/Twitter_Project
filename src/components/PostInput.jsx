import { useState } from "react";

function PostInput({addPost}) {
  const [text, setText] = useState("");

  const handleSubmit = () =>{
    addPost(text);
    setText("");
  }

  return (
    <div className="post-input">
      <input
        type="text"
        placeholder="what's happening"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSubmit}>Post</button>
    </div>
  );
}


export default PostInput;
