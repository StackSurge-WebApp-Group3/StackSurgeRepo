import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://aysha:ta4FhSFfKN0f39qR@cluster0.2maws.mongodb.net/StackSurge?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", authRoutes);

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
