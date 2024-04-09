import app from "./app";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });

const PORT: number | string = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server is running on Port http://localhost:${PORT}`);
});
