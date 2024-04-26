import mongoose from "mongoose";

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to the database successfuly")
    }
    catch(error){
        console.log("Error connecting to database!")
        throw new Error(error)
    }
}

export default connectToDB