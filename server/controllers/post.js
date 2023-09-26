import { handleError } from "../error.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.updateOne({
      $push: {
        comments: {
          user: req.user.id,
          comment: req.body.comment,
        },
      },
    });
    res.status(200).json("Comment added");
  } catch (error) {
    next(handleError(400, error));
  }
};

export const deleteComment = async (req, res, next) => {
  console.log("params", req.params)
  const { postId, commentId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post Not Found" });

    // find comment by comment._id
    const comment = post.comments.id(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // if there is a comment and user is associated with the post or comment then he has the access to delete the comment
    // console.log(comment.user.toString() === req.user.id || post.user.toString() === req.user.id)
    if (comment.user.toString() === req.user.id || post.user.toString() === req.user.id) {
      comment.active = false;
      await post.save();
    } else {
      return res.status(404).json({ message: "Invalid Authority" })
    }
    res.status(200).json({ message: "Comment Deleted" })
  } catch (error) {
    next(handleError(400, error))
  }


};

export const createPost = async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      $push: { posts: newPost._id },
    });

    res.status(200).json(savedPost);
  } catch (error) {
    return next(handleError(500, error));
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.id === req.body.id) {
      // const updatedUser = await User.findByIdAndUpdate(req.body.id, {
      //   $set: { posts: {} },
      // });
      await post.updateOne({ $set: { active: false } });

      res.status(200).json("post deleted", post);
    } else {
      next(handleError(500, error));
    }
  } catch (error) {
    return next(handleError(500, error));
  }
};

export const likes = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.id)) {
      await post.updateOne({ $push: { likes: req.body.id } });
      res.status(200).json("Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.id } });
      res.status(200).json("Disliked");
    }
  } catch (error) {
    return next(handleError(500, error));
  }
};
