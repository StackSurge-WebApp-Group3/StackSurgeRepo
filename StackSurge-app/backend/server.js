import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import serverless from "serverless-http";
import dotenv from "dotenv";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import eventRoutes from "./event.routes.js";

dotenv.config();

const app = express();

// Allow requests from our Vite app
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173", // Vite dev server
        "http://localhost:8888", // Netlify dev server
        "https://stacksurge.netlify.app", // Production Netlify URL
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define routes
app.use("/", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);

// Adjust the base path for Netlify Functions
const router = express.Router();

router.use(bodyParser.json());

// Define routes
router.use("/", authRoutes);
router.use("/api/events", eventRoutes);
router.use("/api/users", userRoutes);

// Use the router with the base path
app.use("/.netlify/functions/server", router);

// Export the app as a Netlify function
export const handler = serverless(app);
