import app from "./app.js";
import dotenv from "dotenv";
import ConnectDB from "./database/database.mongoose.js";

dotenv.config({ path: "./env" });

const PORT: string | number = process.env.PORT || 5000;

ConnectDB()
  .then(() => {
    app.listen(PORT, (): void => {
      console.log(`Server is Running on the PORT ->  http://localhost:${PORT}`);
    });
  })
  .catch((error): void => {
    console.error("Server is not Running : ", error);
  });
