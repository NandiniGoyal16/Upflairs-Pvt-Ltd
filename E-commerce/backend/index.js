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

// console.log(`${Buffer.from([1, 2, 3]).toString("base64")}`);

try {
  await mongoose.connect(
    "mongodb+srv://manul:temp123456@shopperdb.myh7dzn.mongodb.net/"
  );
  console.log("connected successfully!");
} catch (error) {
  console.log(error);
}

import Product from "./schema/Product.js";

app.get("/", (req, res) => {
  res.send("App running");
});

// const storage = multer.memoryStorage({
//   destination: "./upload/images",
//   filename: (_req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// Used for uploading files from UI multipart form data.
const upload = multer();

// app.use("/images", express.static("upload/images"));

// app.post("/upload", upload.single("product"), (req, res) => {
//   res.json({
//     success: true,
//     imageUrl: `http://localhost:${PORT}/images/${req.file.filename}`,
//   });
// });

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
  // console.log(
  //   products[0].image,
  //   Buffer.from(products[0].image.data).toString("base64")
  // );
  // console.log(products[0].image.data.toString("base64"));
  // console.log(
  //   products.map((p) => {
  //     console.log({ ...p });
  //     return {
  //       ...p,
  //       image: {
  //         contentType: p.image.contentType,
  //         data: "hlloe",
  //       },
  //     };
  //   })
  // );
  res.send(processImages(products));
});

app.post("/products/add", upload.single("image"), async (req, res) => {
  // const image = new Image();
  // image.name = req.file.filename;
  // image.data = fs.readFileSync(req.file.path);
  // image.contentType = req.file.mimetype;

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
  // fs.unlinkSync(req.file.path);

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
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
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

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on ${PORT}`);
  }
});
