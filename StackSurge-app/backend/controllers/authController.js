import config from "../config/config.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";

console.log("Environment in serverless function:", process.env);
console.log("JWT_SECRET from environment:", process.env.JWT_SECRET);
console.log("Final jwtSecret value in config:", config.jwtSecret);

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status("401").json({ error: "User not found" });
    if (!user.authenticate(req.body.password)) {
      return res
        .status("401")
        .send({ error: "Email and password don't match." });
    }
    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
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

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "signed out",
  });
};
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
