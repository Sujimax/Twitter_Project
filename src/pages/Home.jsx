import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";

function Home() {
  return (
    <div className="homeContainer">
      <Sidebar />
      <Feed />
    </div>
  );
}

export default Home;