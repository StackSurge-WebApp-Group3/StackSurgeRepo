import mongoose from "mongoose";

export const EVENT_CATEGORIES = [
  "Environment",
  "Education",
  "Health",
  "Animals",
  "Arts & Culture",
  "Sports",
  "Other",
];

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  coverImage: String,
  category: {
    type: String,
    enum: EVENT_CATEGORIES,
    required: true,
  },
  address: String,
  city: String,
  state: String,
  datetime: { type: Date, required: true },
  duration: { type: Number, min: 1, required: true },
  sponsors: [String],
  totalAvailableSlots: { type: Number, required: true },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  avg_rating: { type: Number, default: 5 },
});

export const Event = mongoose.model("Event", eventSchema);
