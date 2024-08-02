const PORT = 4000;
import cors from "cors";
import { randomUUID } from "crypto";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import multer from "multer";

const app = express();
app.use(express.json());

app.use(cors());

try {
  await mongoose.connect(
    "mongodb+srv://nandini:mahiru@myshoppee.cjsuwse.mongodb.net/"
  );
  console.log("connected successfully!");
} catch (error) {
  console.log(error);
}

import Product from "./schema/Product.js";

app.get("/", (req, res) => {
  res.send("App running");
});

const upload = multer();

const processImages = (products) => {
  return products.map((p) => ({
    ...p,
    image: {
      contentType: p.image.contentType,
      data: p.image.data.toString("base64"),
    },
  }));
};

app.get("/products", async (req, res) => {
  const products = await Product.find({}).lean();
  console.log(`Fetching ${products.length} products for /products`);

  res.send(processImages(products));
});

app.post("/products/add", upload.single("image"), async (req, res) => {

  console.log(req.file);
  const product = new Product({
    id: randomUUID(),
    name: req.body.name,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
    category: req.body.category,
    newPrice: req.body.newPrice,
    oldPrice: req.body.oldPrice,
  });

  // Save the product to MongoDB.
  await product.save();

  console.log("Product saved!", { id: product.id, name: req.body.name });
  res.json({
    success: true,
    id: req.body.id,
    name: req.body.name,
  });
});

app.get("/products/newcollections", async (req, res) => {
  const products = await Product.find({}).lean();
  const newCollections = products.slice(1).slice(-8);
  res.send(processImages(newCollections));
});

app.get("/products/popularinwomen", async (req, res) => {
  const products = await Product.find({ category: "women" }).lean();
  const popularInWomen = products.slice(0, 4);
  res.send(processImages(popularInWomen));
});

app.post("/products/delete", async (req, res) => {
  console.log(req.body);
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log(`Deleted product ${req.body.id}`);
  res.json({
    success: true,
    name: product.name,
  });
});

//Schema creating for user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating enpoint for registerng the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "Existing user found with same email address",
    });
  }
  let cart = {};
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating endpoint for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Address" });
  }
});

//creating middleware to fetch user
const fetchUser = async (req, res, next)=> {
  const token = req.header('auth-token');
  if (!token){
    res.status(401).send({errors:"Please authenticate using valid token."})
  }
  else{
    try{
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
    }
    catch(error){
      res.status(401).send({errors:"Please authenticate using a valid token."})

    }
  }
}

//creating endpoint for adding products in cartdata =>
app.post('/addtocart', fetchUser, async(req, res)=>{
    console.log("Added", req.body.itemId);

    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData === undefined ){
      userData.cartData = {};
    }
    if(userData.cartData[req.body.itemId] === undefined){
      userData.cartData[req.body.itemId] = 0;
    }
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send({success: "added"})
    console.log(userData.cartData);
})

//creating endpoint tp remove products from cartData
app.post('/removefromcart', fetchUser, async (req, res)=>{
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({_id:req.user.id});
  if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send({success:"Removed"})
})

//creating endpoint to get cartData =>
app.post('/getcart', fetchUser, async (req, res)=>{
  console.log("GetCart");
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData?? {});
})

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on ${PORT}`);
  }
});
