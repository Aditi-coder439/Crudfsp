const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    image: { type: String, required: true },
    price: { type: Number, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);