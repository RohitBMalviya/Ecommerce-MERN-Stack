import express, { Express } from "express";
import userRouter from "./routers/User/user.routes.js";

const app: Express = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);

export default app;
