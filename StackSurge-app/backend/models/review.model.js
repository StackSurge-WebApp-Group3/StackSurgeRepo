import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: String,
  rating: { type: Number, min: 1, max: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
});

export default mongoose.model("Review", reviewSchema);
