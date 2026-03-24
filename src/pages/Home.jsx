import React, {useState} from "react";
import PostInput from "../components/PostInput";
import PostList from "../components/PostList";

function Home(){

  const [posts, setPosts] = useState([]);

  const addPost = (text) => {

    const newPost = {
      id: Date.now(),
      content: text
    };

    setPosts([newPost, ...posts]);
  };

  return(

    <div style={{width:"500px", margin:"auto"}}>

      <h2>Mini Twitter</h2>

      <PostInput addPost={addPost}/>

      <PostList posts={posts}/>

    </div>

  )

}

export default Home;




// import Sidebar from "../components/Sidebar";
// import Feed from "../components/Feed";

// function Home() {
//   return (
//     <div className="homeContainer">
//       <Sidebar />
//       <Feed />
//     </div>
//   );
// }

// export default Home;