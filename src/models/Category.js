const mongoose = require('mongoose');

const { Schema } = mongoose

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate category names (optional)
  },
  order: {
    type: Number,
    required: false,
  },
  active: {
    type: Boolean,
    required: false
  }
});


// Pre-save hook to assign next highest order value if not provided
categorySchema.pre('save', async function (next) {
    if (!this.order) { // Check if 'order' field is missing
      const highestOrder = await this.constructor.find().sort({ order: -1 }).limit(1); // Find category with highest order
      const newOrder = highestOrder.length ? highestOrder[0].order + 1 : 1; // Calculate next highest order
      this.order = newOrder;
    }
    if(!this.active) this.active = false
    next(); // Call next() to continue the save process
  });

export default mongoose.models.Category || mongoose.model('Category', categorySchema);