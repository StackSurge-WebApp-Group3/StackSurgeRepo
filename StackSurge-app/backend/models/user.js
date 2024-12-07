import mongoose from "mongoose";
import crypto from "crypto";

import { EVENT_CATEGORIES } from "./event.model.js";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashed_pwd: { type: String, required: true },
    salt: String,
    interests: [
      {
        type: String,
        enum: EVENT_CATEGORIES,
        required: true,
      },
    ],
    enrolledEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    volunteerTime: { type: Number, default: 0 },
    givenReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual("password")
  .set(function (password) {
    console.log("VIRTUAL SET");
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_pwd = this.encryptPassword(password);
  })
  .get(function () {
    console.log("VIRTUAL GET");
    return this._password;
  });

userSchema.path("hashed_pwd").validate(function (v) {
  console.log("hashed_pwd");
  if (this._password && this._password.length < 6) {
    console.log("invalidate 6 char");
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    console.log("invalidate is new");
    this.invalidate("password", "Password is required");
  }
}, null);

userSchema.methods = {
  authenticate: function (plainText) {
    console.log("authenticate");
    return this.encryptPassword(plainText) === this.hashed_pwd;
  },
  encryptPassword: function (password) {
    console.log("encryptPassword password:", password);
    if (!password) return "";
    try {
      console.log("TRYING CRYPTO");
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      console.log("CATCH ERR", err);
      return "";
    }
  },
  makeSalt: function () {
    console.log("makeSalt");
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

export const User = mongoose.model("User", userSchema);
