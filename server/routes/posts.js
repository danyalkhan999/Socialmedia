import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  likes,
} from "../controllers/post.js";

const router = express.Router();

// create a post
router.post("/", verifyToken, createPost);

// delete a post
router.delete("/:id", verifyToken, deletePost);

// add comment
router.put("/:id/add-comment", verifyToken, addComment);

// delete comment
router.delete("/:postId/comment/:commentId", verifyToken, deleteComment);

// like or dislike
router.put("/:id/like", likes);
export default router;
