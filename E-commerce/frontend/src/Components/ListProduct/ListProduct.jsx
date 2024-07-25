import React, { useEffect, useState } from "react";
import cross_icon from "../Assets/Admin/cross_icon.png";
import "./ListProduct.css";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    const res = await fetch("http://localhost:4000/products");
    const products = await res.json();
    setAllProducts(products);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/products/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1 style={{ padding: "30px 0", fontSize: "2em" }}>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product) => {
          return (
            <>
              <div
                key={product.id}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={`data:${product.image.contentType};base64,${product.image.data}`}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>${product.oldPrice}</p>
                <p>${product.newPrice}</p>
                <p>{product.category}</p>
                <img
                  src={cross_icon}
                  alt=""
                  className="listproduct-remove-icon"
                  onClick={() => removeProduct(product.id)}
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
