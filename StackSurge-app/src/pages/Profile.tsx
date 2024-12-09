import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Typography, Avatar, Box, Chip } from "@mui/material";
import { ScreenContainer } from "../components/ScreenContainer";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../services/axiosClient";
import { EventDetails } from "../types/Event";
import { EventCard } from "../components/EventCard";

export function Profile() {
  const { user } = useAuth();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [volunteeredEvents, setVolunteeredEvents] = useState<EventDetails[]>(
    []
  );

  // Fetch the user's volunteered events
  useEffect(() => {
    if (user?._id) {
      fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setVolunteeredEvents(data.enrolledEvents || []);
        })
        .catch((error) =>
          console.error("Error fetching volunteered events:", error)
        );
    }
  }, [user]);

  // Fetch the profile picture from localStorage when the component mounts
  useEffect(() => {
    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  // Handle profile picture upload
  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setProfilePic(imageUrl);
        localStorage.setItem("profilePic", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ScreenContainer>
      <Stack gap={3} alignItems="center" style={{ width: "100%" }}>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 3,
              backgroundColor: "secondary.main",
            }}
          >
            <label htmlFor="profile-pic-upload">
              <Avatar
                sx={{ width: 130, height: 130, cursor: "pointer" }}
                src={profilePic || undefined} // Use the profile picture stored in state or null if undefined
              >
                Profile
              </Avatar>
              <input
                type="file"
                id="profile-pic-upload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </label>
            <Box sx={{ marginLeft: 3 }}>
              <Typography variant="h4">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body1">
                Email: {user?.email}
                <br />
                Interests:
                <br />
                {user?.interests?.map((interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                    sx={{ marginRight: 1, marginTop: 1 }}
                  />
                ))}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "primary.main",
              color: "secondary.main",
              padding: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: "secondary.main" }}>
              You have volunteered for:
            </Typography>
            <Box sx={{ paddingTop: 1 }}>
              {volunteeredEvents.length > 0 ? (
                <Stack>
                  {volunteeredEvents.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </Stack>
              ) : (
                <Typography variant="body2">
                  You have not volunteered for any events yet.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Stack>
    </ScreenContainer>
  );
}
