const mongoose = require("mongoose");

const CustomizeSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ Only compile model if it hasn't been compiled already
module.exports = mongoose.models.Customize || mongoose.model("Customize", CustomizeSchema);
