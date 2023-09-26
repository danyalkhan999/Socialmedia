import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  comment: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  active: {
    type: Boolean,
    default: true
  }
});

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      max: 285,
    },
    likes: {
      type: Array,
      default: [],
    },
    active: {
      type: Boolean,
      default: true
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
