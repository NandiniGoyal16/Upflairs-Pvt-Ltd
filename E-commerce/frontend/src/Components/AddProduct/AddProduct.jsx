import React, { useState } from "react";
import uploadarea from "../Assets/Admin/upload_area.svg";
import "./AddProduct.css";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    newPrice: "",
    oldPrice: "",
  });

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const addProductHandler = async () => {
    console.log("Adding product", productDetails);
    console.log("image=", image);
    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("category", productDetails.category);
    formData.append("oldPrice", productDetails.oldPrice);
    formData.append("newPrice", productDetails.newPrice);

    formData.append("image", image);

    // Send multipart form data to the server.
    const response = await fetch("http://localhost:4000/products/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const status = await response.json();

    if (status.success) {
      alert(`Product ${status.name} added successfully.`);
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p className="addprouct-itemlabel">Product title</p>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          value={productDetails.name}
          placeholder="Type here..."
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p className="addprouct-itemlabel">Price</p>
          <input
            type="text"
            name="oldPrice"
            onChange={changeHandler}
            value={productDetails.oldPrice}
            placeholder="Type here..."
          />
        </div>
        <div className="addproduct-itemfield">
          <p className="addprouct-itemlabel">Offer Price</p>
          <input
            type="text"
            name="newPrice"
            onChange={changeHandler}
            value={productDetails.newPrice}
            placeholder="Type here..."
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p className="addprouct-itemlabel">Product Category</p>
        <select
          name="category"
          onChange={changeHandler}
          className="add-product-selector"
          value={productDetails.category}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : uploadarea}
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          hidden
        />
      </div>
      <button onClick={addProductHandler} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
