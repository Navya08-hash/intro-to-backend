import express from "express";

const app = express();

app.use(express.json());


import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// example route: https://localhost:4000/api/v1/users/register
export default app;