import mongoose from "mongoose";

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema(
  {
    token: { type: String, unique: true },
  },
  { timestamps: false } // for created at and recorded at in database
);

export default mongoose.model("RefreshToken", refreshTokenSchema, "refreshTokens"); // first parameter is the model and second parameter is schema mentioned above and third paramter is table name if not given it will automatically set the name making the modal name pural for eg: users
