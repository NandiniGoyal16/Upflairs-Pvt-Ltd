const PORT = 4000;
import cors from "cors";
import { randomUUID } from "crypto";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import jwt from "jsonwebtoken";


const app = express();
app.use(express.json());

app.use(cors());

mongoose.connect(
  "mongodb+srv://manul:temp123456@shopperdb.myh7dzn.mongodb.net/"
);

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

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  console.log(`Fetching ${products.length} products for /products/all`);
  res.send(products);
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

app.post("/products/delete", async (req, res) => {
  const product = await Product.findOneAndDelete({ id: res.body.id });
  console.log(`Deleted product ${res.body.id}`);
  res.json({
    success: true,
    name: product.name,
  });
});

//Schema creating for user model

const Users = mongoose.model('Users',{
  name:{
    type: String,
  },
    email:{
      type: String,
      unique: true,
    },
    password:{
      type:String,
    },
    cartData:{
      type:Object,
    },
    date:{
      type: Date,
      default:Date.now,
    }
})

//creating enpoint for registerng the user
app.post('/signup', async (req,res)=>{
  let check = await Users.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,errors:"Existing user found with same email address"})
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i]=0;
  }
  const user = new Users({
    name:req.body.username,
    email:req .body.email,
    password:req.body.password,
    cartData:cart,
  })

await user.save();

const data = {
  user:{
    id:user.id
  }
}

const token = jwt.sign(data, 'secret_ecom');
res.json({success:true, token})

})

//creating endpoint for user login
app.post('/login', async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user){
      const passCompare = req.body.password === user.password;
      if(passCompare){
        const data = {
          user:{
            id:user.id
          }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.json({success:true, token})
      }
      else{
        res.json({success:false, errors: "Wrong Password"});
      }
    }
    else{
      res.json({success:false, errors: "Wrong Email Address"})
    }
})

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on ${PORT}`);
  }
});
