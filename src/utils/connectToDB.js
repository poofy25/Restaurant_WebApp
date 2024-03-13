import mongoose from "mongoose";

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to the database successfuly")
    }
    catch(error){
        throw new Error("Error connecting to the database!")
    }
}

export default connectToDB