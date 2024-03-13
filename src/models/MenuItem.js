import mongoose from "mongoose";

const { Schema } = mongoose

const MenuItemSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },

},{ timestamps: true })

export default mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema)