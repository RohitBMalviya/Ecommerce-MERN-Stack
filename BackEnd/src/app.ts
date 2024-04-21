import express, { Express } from "express";
import userRouter from "./routers/User/user.routes.js";
import productRouter from "./routers/Product/product.routes.js";
import { Error } from "./middleware/error.middleware.js";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "20kb" }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.use(Error);

export default app;
