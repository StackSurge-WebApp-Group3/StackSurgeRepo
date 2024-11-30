import express from "express";
import authCtrl from "../controllers/authController.js";
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

router
  .route("/:id")
  .get( getEventById)
  .put( updateEvent)
  .delete( removeEvent);

router.post("/:id/register", authCtrl.requireSignin, registerForEvent);
router.post(
  "/:id/cancel-registration",
  authCtrl.requireSignin,
  cancelRegistration
);

router.get("/:id/reviews", getEventReviews);
router.post("/:id/reviews", addReview);

export default router;
