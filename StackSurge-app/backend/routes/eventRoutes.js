import express from "express";
import authCtrl from "../controllers/authController.js"
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


router.post("/", createEvent, authCtrl.requireSignin,authCtrl.hasAuthorization);
router.get("/", getEvents, authCtrl.requireSignin,authCtrl.hasAuthorization);
router.get("/:id", getEventById,authCtrl.requireSignin,authCtrl.hasAuthorization);
router.put("/:id", updateEvent,authCtrl.requireSignin,authCtrl.hasAuthorization);
router.delete("/:id", removeEvent,authCtrl.requireSignin,authCtrl.hasAuthorization);

router.post("/:id/register", registerForEvent,authCtrl.requireSignin,authCtrl.hasAuthorization);
router.delete("/:id/cancel-registration", cancelRegistration,authCtrl.requireSignin,authCtrl.hasAuthorization);

router.post("/:id/review", addReview,authCtrl.requireSignin,authCtrl.hasAuthorization);
router.get("/:id/reviews", getEventReviews,authCtrl.requireSignin,authCtrl.hasAuthorization);

export default router;
  