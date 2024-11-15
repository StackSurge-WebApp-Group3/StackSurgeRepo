import mongoose from "mongoose";

import { EVENT_CATEGORIES } from "./event.model.js";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashed_pwd: { type: String, required: true },
    interests: {
      type: String,
      enum: EVENT_CATEGORIES,
      required: true,
    },
    enrolledEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    volunteerTime: { type: Number, default: 0 },
    givenReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
