import { Schema } from "mongoose";

const Image = new Schema({
  data: Buffer,
  contentType: String,
});

export default Image;
