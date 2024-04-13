import express, { Express } from "express";
import userRouter from "./routers/User/user.routes.js";
import productRouter from "./routers/Product/product.routes.js";

const app: Express = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

export default app;
