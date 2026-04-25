import mongoose from "mongoose";

export async function ConnectToMongoDB(url:string) {
  return await mongoose.connect(url).then(() => {
    console.log("Connect to MongoDB");
  });
}
