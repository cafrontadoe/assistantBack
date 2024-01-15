import { ConnectOptions, connect } from "mongoose";
import config from "./config";

const connectDB = async () => {
  
  const mongoURI = process.env.MONGODB_URI || config.db.connectionString;
  try {
    console.log(mongoURI)
    // const mongoURI: string = config.get("mongoURI");
    await connect(mongoURI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
     } as ConnectOptions);
    console.log("MongoDB Connected...");
  } catch (err: any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;