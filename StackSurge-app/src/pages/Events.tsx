import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { ScreenContainer } from "../components/ScreenContainer";
import { API_BASE_URL } from "../services/axiosClient";
import { EventCard } from "../components/EventCard";
import { EventDetails } from "../types/Event";

export function Events() {
  const [events, setEvents] = useState<EventDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/events`)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenContainer>
      <Stack gap={3} alignItems="center" style={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          Events
        </Typography>

        <TextField
          label="Search Events"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Grid container spacing={3} justifyContent="center">
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <EventCard event={event} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </ScreenContainer>
  );
}
