import mongoose from "mongoose";

const ConnectDB = async (): Promise<void> => {
  try {
    const Connect = await mongoose.connect(
      `${process.env.MONGOOSEURL}/${process.env.DBNAME}`
    );
    console.log(
      "Mongoose Database is Connected Successfully : ",
      Connect.connection.host
    );
  } catch (error) {
    console.error("Mongoose Database is Connection Failed : ", error);
  }
};

export default ConnectDB;
