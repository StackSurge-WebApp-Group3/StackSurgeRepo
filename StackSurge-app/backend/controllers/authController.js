import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

import { User } from "../models/user.js";

export const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status("401").json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .send({ error: "Email and password don't match." });
    }
    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Optionally, set the token in a cookie
    res.cookie("t", token, { expire: new Date() + 9999 });

    // Send the response with the token and user data
    return res.json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        interests: user.interests,
        volunteerTime: user.volunteerTime,
      },
    });
  } catch (err) {
    console.error("Error during sign-in:", err);
    return res.status(500).json({ error: "Could not sign in" });
  }
};

export const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};
export const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

export const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};
