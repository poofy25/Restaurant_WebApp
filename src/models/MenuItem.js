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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference the Category model for establishing a relationship
        required: true,
    },
    imageUrl:{
        type:String,
        required:true
    },
    imageId:{
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
    order: {
        type: Number,
        required: false,
    },
    active: {
        type: Boolean,
        required: false
    }

},{ timestamps: true })

// Pre-save hook to assign next highest order value if not provided
MenuItemSchema.pre('save', async function (next) {
    if (!this.order) { // Check if 'order' field is missing
      const highestOrder = await this.constructor.find().sort({ order: -1 }).limit(1); // Find category with highest order
      const newOrder = highestOrder.length ? highestOrder[0].order + 1 : 1; // Calculate next highest order
      this.order = newOrder;
    }
    if(!this.active) this.active = true
    this.category = new mongoose.Types.ObjectId(this.category)
    next(); // Call next() to continue the save process
  });


export default mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema)