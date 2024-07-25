import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">{`\u20B9${props.newPrice}`}</div>
        <div className="item-price-old">{`\u20B9${props.oldPrice}`}</div>
      </div>
    </div>
  );
};

export default Item;
