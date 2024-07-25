import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./Popular.css";

const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Send a GET request to the server to get all products from the database.
    fetch("http://localhost:4000/products/popularinwomen")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {products.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={`data:${item.image.contentType};base64,${item.image.data}`}
              newPrice={item.newPrice}
              oldPrice={item.oldPrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
