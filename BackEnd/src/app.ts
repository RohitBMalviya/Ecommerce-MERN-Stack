import express, { Express } from "express";
import userRouter from "./routers/User/user.routes.js";
import productRouter from "./routers/Product/product.routes.js";
import { Error } from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import orderRouter from "./routers/Order/order.routes.js";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(Error);
app.use(cors());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

export default app;
