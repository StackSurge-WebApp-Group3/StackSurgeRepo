import express from "express";

import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  removeEvent,
  registerForEvent,
  cancelRegistration,
  addReview,
  getEventReviews,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", removeEvent);

router.post("/:id/register", registerForEvent);
router.delete("/:id/cancel-registration", cancelRegistration);

router.post("/:id/review", addReview);
router.get("/:id/reviews", getEventReviews);

export default router;
