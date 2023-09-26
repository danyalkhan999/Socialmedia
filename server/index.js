import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const PORT = 4000;

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors())

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.send();
});

// mongoose connection and listening server
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGOURL)
    .then(() => {
      console.log("Server listening to port: ", PORT);
    })
    .catch((err) => {
      console.log("Not able to connect", err);
    });
});
