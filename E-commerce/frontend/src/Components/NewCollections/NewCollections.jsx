import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./NewCollections.css";

const NewCollections = () => {
  const [newCollections, setNewCollections] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products/newcollections")
      .then((res) => res.json())
      .then((data) => setNewCollections(data));
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollections.map((item) => {
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

export default NewCollections;
