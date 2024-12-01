import Event from "../models/event.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.js";

// Get events: Allows filtering by title (search query), category, and status through query parameters
export async function getEvents(req, res) {
  const { search, category, status } = req.query ?? {};

  const query = {
    ...(search && { title: new RegExp(search, "i") }),
    ...(category && { category }),
    ...(status && { status }),
  };

  try {
    const events = await Event.find(query)
      .populate({
        path: "reviews",
        select: "comment rating",
      })
      .populate({
        path: "volunteers",
        select: "firstName lastName email",
      });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a specific event by ID
export async function getEventById(req, res) {
  try {
    const event = await Event.findById(req.params.id)
      .populate({
        path: "reviews",
        select: "comment rating",
      })
      .populate({
        path: "volunteers",
        select: "firstName lastName email",
      });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a new event
export async function createEvent(req, res) {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Update an event by ID
export async function updateEvent(req, res) {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete an event by ID
export async function removeEvent(req, res) {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Remove related reviews
    await Review.deleteMany({ event: req.params.id });

    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Add the logged-in user to the list of volunteers for an event if available
export async function registerForEvent(req, res) {
  try {
    const event = await Event.findById(req.params.id)
      .populate({
        path: "reviews",
        select: "comment rating",
      })
      .populate({
        path: "volunteers",
        select: "firstName lastName email",
      });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    if (event.status === "closed") {
      return res.status(400).json({ message: "The event is closed" });
    }
    if (event.totalAvailableSlots <= event.volunteers.length) {
      return res.status(400).json({ message: "No slots available" });
    }
    if (event.volunteers.includes(req.auth._id)) {
      return res.status(400).json({ message: "User is already registered" });
    }

    // Assuming the user is authenticated
    event.volunteers.push(req.auth._id);

    // Update event and add it to the user’s enrolledEvents
    await Promise.all([
      event.save(),
      User.findByIdAndUpdate(req.auth._id, {
        $push: { enrolledEvents: event._id },
      }),
    ]);

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Removes the logged-in user from the list of volunteers
export async function cancelRegistration(req, res) {
  try {
    const event = await Event.findById(req.params.id)
      .populate({
        path: "reviews",
        select: "comment rating",
      })
      .populate({
        path: "volunteers",
        select: "firstName lastName email",
      });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Assuming the user is authenticated
    event.volunteers = event.volunteers.filter(
      (volunteerId) => volunteerId.toString() !== req.auth._id
    );

    // Save event and remove event reference from user’s enrolledEvents
    await Promise.all([
      event.save(),
      User.findByIdAndUpdate(req.auth._id, {
        $pull: { enrolledEvents: event._id },
      }),
    ]);

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Create a review for an event
export async function addReview(req, res) {
  const { rating, comment } = req.body;

  try {
    const event = await Event.findById(req.params.id)
      .populate({
        path: "reviews",
        select: "comment rating",
      })
      .populate({
        path: "volunteers",
        select: "firstName lastName email",
      });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user has already reviewed this event
    const existingReview = await Review.findOne({
      event: event._id,
      user: req.auth._id,
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this event.",
      });
    }

    // Create the review
    const review = new Review({
      comment,
      rating,
      user: req.auth._id,
      event: event._id,
    });

    // Add review reference to Event and update the average rating
    const newAvgRating =
      (event.avg_rating * event.reviews.length + rating) /
      (event.reviews.length + 1);
    event.reviews.push(review._id);
    event.avg_rating = newAvgRating;

    // Save review, event, and update user’s givenReviews
    await Promise.all([
      review.save(),
      event.save(),
      User.findByIdAndUpdate(req.auth._id, {
        $push: { givenReviews: review._id },
      }),
    ]);

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get reviews for an event
export async function getEventReviews(req, res) {
  try {
    const reviews = await Review.find({ event: req.params.id })
      .populate("user", "firstName lastName")
      .select("comment rating user");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
