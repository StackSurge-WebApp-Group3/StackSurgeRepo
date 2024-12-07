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
        select: "comment rating user",
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
        populate: {
          path: 'user',
          select: 'firstName lastName'
        } 
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
    if (event.volunteers.some((volunteer) => volunteer._id.equals(req.auth._id))) {
      return res.status(400).json({ message: "User is already registered" });
    }

    // Add user to event's volunteers and event to user's enrolledEvents
    event.volunteers.push(req.auth._id);
    await Promise.all([
      event.save(),
      User.findByIdAndUpdate(req.auth._id, { $push: { enrolledEvents: event._id } }),
    ]);

    res.status(200).json({ message: "Registration successful", event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Removes the logged-in user from the list of volunteers
export async function cancelRegistration(req, res) {
  try {
    // Ensure the user is authenticated
    if (!req.auth || !req.auth._id) {
      return res.status(401).json({ message: "Unauthorized: User ID not found" });
    }

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

    const userId = req.auth._id;
    const initialVolunteerCount = event.volunteers.length;

    event.volunteers = event.volunteers.filter(
      (volunteer) => volunteer._id.toString() !== userId
    );

    await Promise.all([
      event.save(),
      User.findByIdAndUpdate(userId, {
        $pull: { enrolledEvents: event._id },
      }),
    ]);

    res.json({
      message: "Registration cancelled successfully",
      eventId: event._id,
      removedUser: userId,
      remainingVolunteers: initialVolunteerCount - 1,
    });
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

    // Return the review object instead of the entire event object
    res.status(201).json(review); // Sending only the created review back
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Get reviews for an event
export async function getEventReviews(req, res) {
  try {
    const reviews = await Review.find({ event: req.params.id })
      .populate("user", "firstName lastName") // Populate user details
      .select("comment rating user"); // Select the necessary fields

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function handleDeleteReview(req, res) {
  try {
    console.log('Deleting review for reviewId:', req.body.reviewId);
    const { reviewId } = req.body; 
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await Promise.all([
      Event.findByIdAndUpdate(review.event, { $pull: { reviews: review._id } }),
      User.findByIdAndUpdate(review.user, { $pull: { givenReviews: review._id } }),
      Review.findByIdAndDelete(reviewId),
    ]);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error('Error during review deletion:', error);
    res.status(500).json({ message: error.message });
  }
}

