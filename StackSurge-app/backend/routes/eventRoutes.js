import express from "express";

import { addEvent, getAllEvents, getEventById, updateEvent, removeEvent } from "../controllers/eventController.js";

const router = express.Router();

router.post("/", addEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", removeEvent);

export default router;
