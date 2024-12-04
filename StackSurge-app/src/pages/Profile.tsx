import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { Typography, Avatar, Box } from "@mui/material";
import { ScreenContainer } from "../components/ScreenContainer";
import { useAuth } from "../context/AuthContext";

export function Profile() {
  const { user } = useAuth();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [volunteeredEvents, setVolunteeredEvents] = useState<string[]>([]);

  // Fetch the user's volunteered events
  useEffect(() => {
    if (user?._id) {
      fetch(`http://localhost:3000/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setVolunteeredEvents(data.enrolledEvents.map((item: any) => (item.title)) || []);
        })
        .catch((error) => console.error("Error fetching volunteered events:", error));
    }
  }, [user]);

  // Fetch the profile picture from localStorage when the component mounts
  useEffect(() => {
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }
  }, []);

  // Handle profile picture upload
  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setProfilePic(imageUrl);
        localStorage.setItem('profilePic', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <ScreenContainer>
      <Stack gap={3} alignItems="center" style={{ width: '100%' }}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 3,
              backgroundColor: 'secondary.main',
            }}
          >
            <label htmlFor="profile-pic-upload">
              <Avatar
                sx={{ width: 130, height: 130, cursor: 'pointer' }}
                src={profilePic || undefined} // Use the profile picture stored in state or null if undefined
              >
                Profile
              </Avatar>
              <input
                type="file"
                id="profile-pic-upload"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </label>
            <Box sx={{ marginLeft: 3 }}>
              <Typography variant="h4">
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body1">
                ID: {user?._id}
                <br />
                Email: {user?.email}
                <br />
                Interests List:
                <br />
                {user?.interests?.map((interest, index) => (
                  <span key={index}>
                    {'-'} {interest}
                    {index !== user.interests.length - 1 && <br />}
                  </span>
                ))}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
              backgroundColor: 'primary.main',
              color: 'secondary.main',
              padding: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: 'secondary.main' }}>
              You have volunteered for:
            </Typography>
            <Box sx={{ paddingTop: 1 }}>
              {volunteeredEvents.length > 0 ? (
                <ul>
                  {volunteeredEvents.map((event, index) => (
                    <li key={index}>
                      <Typography variant="body1">{event}</Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography variant="body2">You have not volunteered for any events yet.</Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Stack>
    </ScreenContainer>
  );
};