import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true } // for created at and recorded at in database
);

export default mongoose.model("Product", productSchema, "products"); // first parameter is the model and second parameter is schema mentioned above and third paramter is table name if not given it will automatically set the name making the modal name pural for eg: users
