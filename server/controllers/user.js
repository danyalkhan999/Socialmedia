import { handleError } from "../error.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(handleError(403, "You can only update your data"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await Post.deleteMany({ user: req.params.id });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(handleError(403, "You can only update your data"));
  }
};

export const follow = async (req, res, next) => {
  try {
    // user to follow
    const user = await User.findById(req.params.id);
    // current user
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $push: { following: req.params.id },
      });
    } else {
      res.status(403).json("You already follow this user");
    }
    res.status(200).json("Following the user");
  } catch (error) {
    next(error);
  }
};

export const unfollow = async (req, res, next) => {
  try {
    // user to follow
    const user = await User.findById(req.params.id);
    // current user
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });

      await currentUser.updateOne({
        $pull: { following: req.params.id },
      });
    } else {
      res.status(403).json("You are not following this user");
    }
    res.status(200).json("Unfollowed the user");
  } catch (error) {
    next(error);
  }
};
