import express from "express";
import authCtrl from "./auth.controller.js";
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
} from "./event.controller.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);

router.route("/:id").get(getEventById).put(updateEvent).delete(removeEvent);

router.post("/:id/register", authCtrl.requireSignin, registerForEvent);
router.delete(
  "/:id/cancel-registration",
  authCtrl.requireSignin,
  cancelRegistration
);

router.get("/:id/reviews", authCtrl.requireSignin, getEventReviews);
router.post("/:id/reviews", authCtrl.requireSignin, addReview);
router.delete("/:id/review-delete", authCtrl.requireSignin, handleDeleteReview);

export default router;
