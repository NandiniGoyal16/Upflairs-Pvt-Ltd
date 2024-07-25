import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./Popular.css";

const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Send a GET request to the server to get all products from the database.
    fetch("http://localhost:4000/products")
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
              image={null}
              new_price={item.newPrice}
              old_price={item.oldPrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
