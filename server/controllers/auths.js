import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../error.js";
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: maxAge });
};

const isAvailable = async (username, email) => {
  const existingUsername = await User.findOne({ username });
  const existingEmail = await User.findOne({ email });

  const response = {
    username: !!existingUsername,
    email: !!existingEmail,
  };
  console.log(response);
  return response;
};


export const signup = async (req, res, next) => {

  console.log(req.body)
  //   console.log(req.body);
  const { username, email } = req.body;

  try {
    const available = await isAvailable(username, email);
    // console.log(available.email, available.username);



    if (available.username)
      res.status(400).json("Username is not available");
    if (available.email) res.status(400).json("Email is already is use");

    const salt = bcrypt.genSaltSync(11);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPassword });
    await newUser.save();

    const token = createToken(newUser._id);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      })
      .status(200)
      .json({ newUser: newUser._id });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  console.log("Node Body", req.body);

  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user || user.active === false) return res.status(404).json({ message: "User Not Found" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return next(handleError(400, "Incorrect Password"));

    const token = createToken(user._id);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      })
      .status(200)
      .json({ user: user._id });
  } catch (error) {
    next(handleError(400, error))
  }
};
