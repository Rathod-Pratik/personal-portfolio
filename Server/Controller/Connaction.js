import mongoose from "mongoose";

export async function ConnectToMongoDB(url) {
  return await mongoose.connect(url).then(() => {
    console.log("Connect to MongoDB");
  });
}
