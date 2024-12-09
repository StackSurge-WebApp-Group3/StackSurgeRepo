import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EventDetails } from "../types/Event";

export function EventCard({ event }: { event: EventDetails }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={event.coverImage}
        alt={event.title}
      />
      <CardContent>
        <Typography variant="h6">{event.title}</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginBottom: 2 }}
        >
          {event.description}
        </Typography>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate(`/events/${event._id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
