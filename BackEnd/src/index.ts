import app from "./app.js";
import dotenv from "dotenv";
import ConnectDB from "./database/database.mongoose.js";

dotenv.config({ path: "./env" });

// when the Variable is Not defined
// Modified Error
process.on("uncaughtException", (error: Error) => {
  console.error(`Error: ${error.message}`);
  console.log("ShutDown the Server");
  process.exit(1);
});

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
