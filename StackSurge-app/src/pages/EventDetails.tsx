import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { ScreenContainer } from "../components/ScreenContainer";
import { useAuth } from "../context/AuthContext";
import Rating from "@mui/material/Rating";
import { API_BASE_URL } from "../services/axiosClient";

interface EventDetailsProps {
  title: string;
  images: string[];
  time: string;
  date: string;
  organizers: string;
  duration: string;
  location: string;
}

interface Review {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  comment: string;
  rating: number;
}

export function EventDetails() {
  const { user } = useAuth();
  const { eventId } = useParams<{ eventId: string }>();
  const [eventDetails, setEventDetails] = useState<EventDetailsProps | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [rating, setRating] = useState<number>(5);

  useEffect(() => {
    if (!eventId) return;

    const registrationStatus = localStorage.getItem(`isRegistered_${eventId}`);
    if (registrationStatus === "true") {
      setIsRegistered(true);
    }

    fetch(`${API_BASE_URL}/api/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        const dateTime = new Date(data.datetime);

        // Set event details
        setEventDetails({
          title: data.title,
          images: [data.coverImage],
          time: dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: dateTime.toLocaleDateString(),
          organizers: data.sponsors?.[0],
          duration: data.duration,
          location: `${data.address}, ${data.city}, ${data.state}`,
        });

        // Set reviews
        const fetchedReviews = (data.reviews || []).map((review: Review) => ({
          _id: review._id,
          user: review.user || { _id: "", firstName: "", lastName: "" },
          comment: review.comment,
          rating: review.rating,
        }));
        setReviews(fetchedReviews);
      })
      .catch((error) => console.error("Error fetching event details:", error));
  }, [eventId]);

  if (!eventId) {
    return <></>;
  }

  if (!eventDetails) {
    return (
      <ScreenContainer>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Loading event details...
        </Typography>
      </ScreenContainer>
    );
  }

  // Function to delete a review
  const handleDeleteReview = (reviewId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to be logged in to delete a review.");
      return;
    }

    fetch(`${API_BASE_URL}/api/events/${eventId}/review-delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reviewId }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            console.error("Backend error response:", data);
            throw new Error(data.message || "Failed to delete review");
          });
        }
        return response.json();
      })
      .then(() => {
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
        alert("Review deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        alert(`Error deleting review: ${error.message}`);
      });
  };

  return (
    <ScreenContainer>
      <Stack gap={3} alignItems="center" style={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          {eventDetails.title}
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {eventDetails.images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia component="img" height="200" image={image} alt={`Event Image ${index + 1}`} />
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ width: "100%" }} />
        <Typography variant="body1">
          <strong>Time:</strong> {eventDetails.time}
        </Typography>
        <Typography variant="body1">
          <strong>Date:</strong> {eventDetails.date}
        </Typography>
        <Typography variant="body1">
          <strong>Organizers:</strong> {eventDetails.organizers}
        </Typography>
        <Typography variant="body1">
          <strong>Duration:</strong> {eventDetails.duration}
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> {eventDetails.location}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (isRegistered) {
              setIsRegistered(false);
              localStorage.removeItem(`isRegistered_${eventId}`);

              fetch(`${API_BASE_URL}/api/events/${eventId}/cancel-registration`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((response) => response.json())
                .then(() => alert("Successfully unregistered from the event."))
                .catch((error) => {
                  alert(`Error: ${error.message}`);
                  setIsRegistered(true);
                });
            } else {
              setIsRegistered(true);
              localStorage.setItem(`isRegistered_${eventId}`, "true");

              fetch(`${API_BASE_URL}/api/events/${eventId}/register`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((response) => response.json())
                .then(() => alert("Successfully registered to volunteer!"))
                .catch((error) => {
                  alert(`Error: ${error.message}`);
                  setIsRegistered(false);
                });
            }
          }}
        >
          {isRegistered ? "Cancel Registration" : "Register to Volunteer"}
        </Button>

        <Divider sx={{ width: "100%" }} />

        <Typography variant="h5" sx={{ textAlign: "center", marginTop: 3 }}>
          Reviews
        </Typography>

        <Stack gap={2} sx={{ width: "100%" }}>
          {reviews.map((review) => (
            <Card key={review._id} sx={{ padding: 2 }}>
              <Typography variant="subtitle1">
                {review.user.firstName} {review.user.lastName}
              </Typography>
              <Typography variant="body2">{review.comment}</Typography>
              <Typography variant="body2">Rating: {review.rating}</Typography>

              {/* Show Delete Button only if user owns the review */}
              {user?._id === review.user._id && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDeleteReview(review._id)}
                  sx={{ marginTop: 1 }}
                >
                  Delete Review
                </Button>
              )}
            </Card>
          ))}
        </Stack>

        <TextField
          label="Write a review"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />

        <Rating
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue || 0)}
          sx={{ marginTop: 2 }}
        />

        <Button
          variant="contained"
          onClick={() => {
            if (newReview.trim()) {
              const token = localStorage.getItem("token");
              if (!token) {
                alert("You need to be logged in to submit a review.");
                return;
              }

              const review: Review = {
                _id: "",
                user: { 
                  _id: user?._id || "", 
                  firstName: user?.firstName || "", 
                  lastName: user?.lastName || "", 
                },
                comment: newReview.trim(),
                rating,
              };

              fetch(`${API_BASE_URL}/api/events/${eventId}/reviews`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ comment: review.comment, rating: review.rating }),
              })
                .then((response) => {
                  if (!response.ok) {
                    return response.json().then((data) => {
                      throw new Error(data.message || "Failed to submit review");
                    });
                  }
                  return response.json();
                })
                .then((savedReview) => {
                  setNewReview("");
                  setRating(5);
                  setReviews((prevReviews) => [
                    ...prevReviews,
                    { ...savedReview, user: review.user },
                  ]);
                })
                .catch((error) => {
                  console.error("Error submitting review:", error);
                  alert("Failed to submit review.");
                });
            }
          }}
          disabled={!newReview.trim()}
        >
          Submit Review
        </Button>
      </Stack>
    </ScreenContainer>
  );
}
