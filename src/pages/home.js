import React, { useContext, useState, useEffect } from "react";

function Home(props) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {

    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=8`)
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        setData(data);
      });
  }, []);

  const listItems = () => {
    return data.map((element) => {
      return <p>{element.body}</p>;
    });
  };

  return (
    <div className="App">
      <h1>Content</h1>
      <h2>Is here</h2>
      {listItems()}
      {data.map((el) => {
        return <p>This element: {el.body}</p>;
      })}
    </div>
  );
}

export default Home;
