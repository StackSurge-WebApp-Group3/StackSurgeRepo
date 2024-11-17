import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  interests: [{ type: String }],
  enrolledEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  volunteerTime: { type: Number, default: 0 },
  givenReviews: [{
    comment: String,
    rating: { type: Number, min: 1, max: 5 }
  }]
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);
