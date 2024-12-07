import express from "express";
import {
  requireSignin,
  hasAuthorization,
} from "../controllers/authController.js";
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
  handleDeleteReview,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);

router.route("/:id").get(getEventById).put(updateEvent).delete(removeEvent);

router.post("/:id/register", requireSignin, registerForEvent);
router.delete("/:id/cancel-registration", requireSignin, cancelRegistration);

router.get("/:id/reviews", requireSignin, getEventReviews);
router.post("/:id/reviews", requireSignin, addReview);
router.delete("/:id/review-delete", requireSignin, handleDeleteReview);

export const eventRoutes = router;
