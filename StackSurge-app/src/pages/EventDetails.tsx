/*
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { ScreenContainer } from "../components/ScreenContainer";

export function EventDetails() {
  return (
    <ScreenContainer>
      <Stack gap={3} alignItems="center" style={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          Event Details
        </Typography>
      </Stack>
    </ScreenContainer>
  );
}
*/

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
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  comment: string;
  rating: number;
}

export function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const [eventDetails, setEventDetails] = useState<EventDetailsProps | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // State for tracking registration status

  useEffect(() => {
    fetch(`http://localhost:3000/api/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        const dateTime = new Date(data.datetime);
        setEventDetails({
          title: data.title,
          images: [data.coverImage],
          time: dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: dateTime.toLocaleDateString(),
          organizers: data.sponsors?.[0] || "Unknown",
          duration: data.duration,
          location: `${data.address}, ${data.city}, ${data.state}`,
        });
        setReviews(
          (data.reviews || []).map((review: any) => ({
            ...review,
            user: review.user || { _id: "unknown", firstName: "Unknown", lastName: "" },
          }))
        );
      })
      .catch((error) => console.error("Error fetching event details:", error));
  }, [eventId]);

  // Handle registration
  const handleVolunteerRegister = () => {
    setIsRegistered(true); // Set the state to true when the user registers
    alert("Successfully registered to volunteer!"); // Show the success alert
  };

  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      const review: Review = {
        user: { _id: "anonymous", firstName: "Anonymous", lastName: "" },
        comment: newReview.trim(),
        rating: 5,
      };

      fetch(`http://localhost:3000/api/events/${eventId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      })
        .then((response) => response.json())
        .then((savedReview) => {
          setReviews((prev) => [...prev, savedReview]);
          setNewReview("");
        })
        .catch((error) => console.error("Error submitting review:", error));
    }
  };

  if (!eventDetails) {
    return (
      <ScreenContainer>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Loading event details...
        </Typography>
      </ScreenContainer>
    );
  }

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

        {/* Register button with dynamic text */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleVolunteerRegister}
          disabled={isRegistered} // Disable if already registered
        >
          {isRegistered ? "Registered to Volunteer" : "Register to Volunteer"}
        </Button>

        <Divider sx={{ width: "100%" }} />

        <Typography variant="h5" sx={{ textAlign: "center", marginTop: 3 }}>
          Reviews
        </Typography>

        <Stack gap={2} sx={{ width: "100%" }}>
          {reviews.map((review, index) => (
            <Card key={index} sx={{ padding: 2 }}>
              <Typography variant="subtitle1">
                {review.user.firstName} {review.user.lastName}
              </Typography>
              <Typography variant="body2">{review.comment}</Typography>
              <Typography variant="body2">Rating: {review.rating}/5</Typography>
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
        <Button
          variant="contained"
          onClick={handleReviewSubmit}
          disabled={!newReview.trim()} // Disable submit if no review text
        >
          Submit Review
        </Button>
      </Stack>
    </ScreenContainer>
  );
}
