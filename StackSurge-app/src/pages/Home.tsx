import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Container, Box, Card, CardContent } from '@mui/material'

import { AppPath } from '../router/routes'
import { ScreenContainer } from '../components/ScreenContainer'

import Logo from '../assets/CircleLogo.png'

export function Home() {
  const navigate = useNavigate()

  const events = [
    {
      id: 1,
      name: 'Community Mural Painting',
      imageUrl: 'https://www.artsetobicoke.com/wp-content/uploads/2023/02/IMG_5895-1024x819.jpeg',
    },
    {
      id: 2,
      name: 'Community Park Cleanup',
      imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/006/902/088/small_2x/group-of-people-cleaning-up-city-park-vector.jpg',
    },
    {
      id: 3,
      name: 'Reading Children Program',
      imageUrl: 'https://assets.clevelandclinic.org/transform/a655e0dc-f6e7-4d55-8265-73f3777ece09/reading2Baby-1188507089-770x553-1_jpg',
    },
  ];

  return (
    <ScreenContainer sx={{ maxWidth: '100%', paddingLeft: 0, paddingRight: 0 }}>
      <Stack gap={3} alignItems="center" style={{ width: '100%' }}>
        <Box
          sx={{
            backgroundColor: '#006633',
            width: '60vw',
            padding: '10px',
            borderRadius: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h2" sx={{ textAlign: 'center', color: '#FFFFFF', marginTop: '70px' }}>
            Hello! And Welcome To
          </Typography>

          <img
            src={Logo}
            alt="Logo"
            style={{ width: '500px', height: '500px'}}
          />
        </Box>
      </Stack>

      <Stack gap={3} alignItems="center" style={{ width: '100%' }}>
        <Card sx={{ backgroundColor: '#36C46C', width: '80%', padding: '20px' }}>
          <CardContent>
            <Typography variant="body1" sx={{ color: '#FFFFFF' , textAlign: 'center'}}>
              Stack Surge is dedicated to help you find volunteer opportunities at community and private events! See the our list of events to find the one best suited for you and volunteer today!
            </Typography>
          </CardContent>
        </Card>

        <Stack direction="row" spacing={2} justifyContent="center" width="100%">
          {events.map((event) => (
            <Card
              key={event.id}
              sx={{
                backgroundColor: '#36C46C',
                width: '30%',
                display: 'flex',
                flexDirection: 'column',
                height: '300px',
              }}
            >
              <Box
                sx={{
                  height: '70%',
                  backgroundImage: `url(${event.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></Box>

              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ textAlign: 'center', color: '#FFFFFF' }}>
                  {event.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{
            fontSize: '1.5rem',
            padding: '16px 32px',
            width: '30%',
            borderRadius: '40px',
          }}
          onClick={() => {
            navigate(AppPath.Login);
          }}
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate(AppPath.SignUp)}
          >
            Sign Up
          </Button>
        </Typography>
      </Stack>
    </ScreenContainer>
  )
}
