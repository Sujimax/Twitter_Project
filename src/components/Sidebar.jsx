function Sidebar() {
  function handleLogout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <div className="sidebar">
      <h2>Mini Twitter</h2>

      <p>Home</p>
      <p>Profile</p>
      <p onClick={handleLogout} style={{ cursor: "pointer", color: "red" }}>
        Logout
      </p>
    </div>
  );
}

export default Sidebar;