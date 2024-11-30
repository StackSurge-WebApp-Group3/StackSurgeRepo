import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import { ScreenContainer } from "../components/ScreenContainer";

const teamMembers = [
  {
    name: "Ameekha",
    role: "Agile Project Manager & Documentation",
    image: "/images/ameekha.jpg",
  },
  {
    name: "Aysha",
    role: "Express Server & MongoDB Setup",
    image: "/images/aysha.jpg",
  },
  {
    name: "Estefany",
    role: "Backend: Event CRUD, RSVP, Feedback/Ratings",
    image: "/images/estefany.jpg",
  },
  {
    name: "Ido Isaac",
    role: "Wireframes & External Design",
    image: "/images/ido.jpg",
  },
  {
    name: "Patrick",
    role: "Backend: User API & Authentication",
    image: "/images/patrick.jpg",
  },
  {
    name: "Zachary Lyons",
    role: "Presentation Slides & Video",
    image: "/images/zachary.jpg",
  },
];

export function AboutUs() {
  return (
    <ScreenContainer>
      <Stack gap={3} alignItems="center" style={{ width: "100%" }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
          About Us
        </Typography>
        <Grid container spacing={3}>
          {teamMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.name}>
              <Card sx={{ maxWidth: 345, textAlign: "center" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={member.image}
                  alt={`${member.name}'s headshot`}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ width: "80%", my: 4 }} />
        <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
          Our Mission
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", px: 3, maxWidth: "800px" }}>
          We are an independent startup dedicated to bridging the gap between event organizers 
          and attendees. Our platform simplifies event creation and discovery, empowering communities 
          to connect through shared experiences. By making it easy to find and join events, we aim to 
          bring people closer together and celebrate the joy of shared moments.
        </Typography>
      </Stack>
    </ScreenContainer>
  );
}
