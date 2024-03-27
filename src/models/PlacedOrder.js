import mongoose from "mongoose";

const { Schema } = mongoose

const PlacedOrderSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:false
    },
    street:{
        type:String,
        required:true
    },
    scara:{
        type:String,
        required:false
    },
    floor:{
        type:String,
        required:false
    },
    interfon:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:true
    },
    sector:{
        type:String,
        required:true
    },
    info:{
        type:String,
        required:false
    },
    totalPrice:{
        type:Number,
        required:true
    },
    deliveryPrice:{
        type:Number,
        required:true
    },
    items:{
        type:[{
            "_id":{type:String},
            "name":{type:String},
            "price":{type:Number},
            "category":{type:String},
            "imageUrl":{type:String},
            "imageId":{type:String},
            "description":{type:String},
            "weight":{type:String},
            "createdAt":{type:String},
            "updatedAt":{type:String},
            "__v":{type:Number},
            "quantity":{type:Number},
        }],
        required:true
    },
    totalItems:{
        type:Number,
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }

},{ timestamps: true })

export default mongoose.models.PlacedOrder || mongoose.model("PlacedOrder", PlacedOrderSchema)