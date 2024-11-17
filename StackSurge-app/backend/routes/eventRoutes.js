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
  .get(authCtrl.requireSignin, getEventById)
  .put(authCtrl.requireSignin, updateEvent)
  .delete(authCtrl.requireSignin, removeEvent);

router.post("/:id/register", authCtrl.requireSignin, registerForEvent);
router.post(
  "/:id/cancel-registration",
  authCtrl.requireSignin,
  cancelRegistration
);

router.get("/:id/reviews", authCtrl.requireSignin, getEventReviews);
router.post("/:id/reviews", authCtrl.requireSignin, addReview);

export default router;
