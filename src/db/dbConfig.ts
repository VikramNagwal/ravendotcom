import mongoose from "mongoose";

export const dbConnect = async () => {
   try {
    const response = await mongoose.connect('mongodb://localhost:27017/ravendotcom-db')
    console.log("database connected successfully")
    const connection = mongoose.connection;

    connection.on("error", (err) => {
        console.error("connection error: ", err)
        return process.exit(1)
    })
    connection.on("connection", () => {
        console.log('database connected successfully')
    })
    return response
   } catch (error) {
    console.log("database connection failed: ", error)
   }
}