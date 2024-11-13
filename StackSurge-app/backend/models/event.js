import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, required: true },
  address: String,
  city: String,
  state: String,
  datetime: { type: Date, required: true },
  duration: { type: Number, required: true },
  sponsors: [String],
  totalAvailableSlots: { type: Number, required: true },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reviews: [
    {
      comment: String,
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
  avg_rating: { type: Number, default: 0 },
});

export default mongoose.model("Event", eventSchema);
