import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" },
  },
  { timestamps: ture } // for created at and recorded at in database
);


export default mongoose.model('User',userSchema, 'users' )// first parameter is the model and second parameter is schema mentioned above and third paramter is table name if not given it will automatically set the name making the modal name pural for eg: users