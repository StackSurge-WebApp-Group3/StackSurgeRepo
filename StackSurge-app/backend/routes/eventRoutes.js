const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
router.post('/', eventController.addEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.removeEvent);

module.exports = router;
