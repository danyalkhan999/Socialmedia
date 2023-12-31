import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    description: { type: String },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    occupation: { type: String },
    gender: { type: String },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
