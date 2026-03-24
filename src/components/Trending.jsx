function Trending() {

  const trends = [
    "#ReactJS",
    "#JavaScript",
    "#WebDevelopment",
    "#100DaysOfCode",
    "#AI"
  ];

  return (
    <div className="trending">
      <h3>Trends for you</h3>

      {trends.map((trend, index) => (
        <div key={index} className="trend-item">
          {trend}
        </div>
      ))}

    </div>
  );
}

export default Trending;