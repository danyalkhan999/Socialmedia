import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../error.js";
import { OtpGenerator } from "../otpGenerator.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
const maxAge = 3 * 24 * 60 * 60;

dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD
  }
});

// console.log(transporter);


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


// const isVerified = (email) => {
//   return false;
// }

export const signup = async (req, res, next) => {

  console.log(req.body)
  //   console.log(req.body);
  const { username, email } = req.body;

  try {
    const available = await isAvailable(username, email);
    // console.log(available.email, available.username);


    // checks email and user nmae is pre-existing or not
    if (available.username)
      res.status(400).json("Username is not available");
    if (available.email) res.status(400).json("Email is already is use");


    // add some additional data to password or bcrypt the password
    const salt = bcrypt.genSaltSync(11);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashPassword });
    const otp = OtpGenerator();
    newUser.otp = otp;
    newUser.otpExpires = new Date(Date.now() + 15 * 60 * 1000); // otp expires is 15 mins
    await newUser.save();

    console.log(newUser.email)

    let message = {
      from: process.env.EMAIL, // sender address
      to: newUser.email, // list of receivers
      subject: "OTP for Email verification", // Subject line
      text: `Your otp is ${otp}`, // plain text body
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0"><div style="border-bottom:1px solid #eee"><a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ShareLink</a></div><p style="font-size:1.1em">Hi, ${newUser.username}</p><p>Welcome to ShareLink. Use the following OTP to complete your Sign Up procedures. OTP is valid for 15 minutes</p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2><p style="font-size:0.9em;">Regards,<br />ShareLink</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"><p>ShareLink Inc</p><p>P-32 Jaipur</p><p>Rajasthan</p></div></div></div>`,
    }

    await transporter.sendMail(message).then(() => {
      res.status(200).json({ message: "Otp Sent", user: newUser })

    }).catch((error) => {
      console.log("Error in sending mail", error)
      res.status(400).json("Email not sent")
    })

    // const token = createToken(newUser._id);
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //     maxAge: maxAge * 1000,
    //   })
    //   .status(200)
    //   .json({ newUser: newUser._id, accessToken: token });
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

    if (!isPasswordCorrect) return res.status(404).json({ message: "Incorrect Password" });

    const token = createToken(user._id);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      })
      .status(200)
      .json({ user: user._id, userToken: token });
  } catch (error) {
    next(handleError(400, error))
  }
};

export const logout = (req, res) => {
  console.log("logged out test")
  res.status(200).json({ message: "Logged Out" })

}
