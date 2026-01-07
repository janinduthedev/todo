import mongoose from 'mongoose'

const connectDB = async () => {
   try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
   } catch (error) {
    console.log("MongoDB connection is failed");
    process.exit(1); // Stop app if DB fails
   }
};
export default connectDB;