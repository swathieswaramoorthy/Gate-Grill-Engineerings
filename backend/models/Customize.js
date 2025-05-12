import mongoose from 'mongoose';

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

export default mongoose.models.Customize || mongoose.model("Customize", CustomizeSchema);
