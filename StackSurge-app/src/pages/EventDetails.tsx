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
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (!eventId) {
      return;
    }
    const registrationStatus = localStorage.getItem(`isRegistered_${eventId}`);
    if (registrationStatus === "true") {
      setIsRegistered(true);
    }

    fetch(`http://localhost:3000/api/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        const dateTime = new Date(data.datetime);
        setEventDetails({
          title: data.title,
          images: [data.coverImage],
          time: dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          date: dateTime.toLocaleDateString(),
          organizers: data.sponsors?.[0],
          duration: data.duration,
          location: `${data.address}, ${data.city}, ${data.state}`,
        });
        setReviews(
          (data.reviews || []).map((review: any) => ({
            ...review,
            comment: review.comment,
            user: review.user || { _id: "", firstName: "", lastName: "" },
          }))
        );
      })
      .catch((error) => console.error("Error fetching event details:", error));
  }, [eventId]);

  if (!eventId) {
    return <></>;
  }

  // While event details are loading
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (isRegistered) {
              // Unregister logic
              setIsRegistered(false);
              localStorage.removeItem(`isRegistered_${eventId}`);

              fetch(`http://localhost:3000/api/events/${eventId}/cancel-registration`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    return response.json().then((data) => {
                      throw new Error(data.message || "Failed to unregister");
                    });
                  }
                  return response.json();
                })
                .then(() => {
                  alert("Successfully unregistered from the event.");
                })
                .catch((error) => {
                  alert(`Error: ${error.message}`);
                  setIsRegistered(true);
                });
            } else {
              setIsRegistered(true);
              localStorage.setItem(`isRegistered_${eventId}`, "true");

              fetch(`http://localhost:3000/api/events/${eventId}/register`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    return response.json().then((data) => {
                      throw new Error(data.message || "Failed to register");
                    });
                  }
                  return response.json();
                })
                .then(() => {
                  alert("Successfully registered to volunteer!");
                })
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
          {reviews.map((review, index) => (
            <Card key={index} sx={{ padding: 2 }}>
              <Typography variant="subtitle1">
                {review.user.firstName} {review.user.lastName}
              </Typography>
              <Typography variant="body2">{review.comment}</Typography>
              <Typography variant="body2">{review.rating}</Typography>
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
          onClick={() => {
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
          }}
          disabled={!newReview.trim()}
        >
          Submit Review
        </Button>
      </Stack>
    </ScreenContainer>
  );
}
