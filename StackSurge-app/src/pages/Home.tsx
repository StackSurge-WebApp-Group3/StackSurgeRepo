import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Box, Card, CardContent } from '@mui/material'

import { AppPath } from '../router/routes'

import Logo from '../assets/CircleLogo.webp'
import { getEvents } from '../services/events'

export function Home() {
  const navigate = useNavigate()
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return (
    <Stack>
      <Stack gap={3} alignItems="center" style={{ width: '100%' }}>
        <Box
          sx={{
            backgroundColor: '#006633',
            width: '100%',
            padding: '10px',
            borderRadius: '0 0 50% 50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h2" sx={{ textAlign: 'center', color: '#FFFFFF', marginTop: '70px' }}>
          </Typography>

          <img
            src={Logo}
            alt="Logo"
            style={{ width: '500px', height: '500px'}}
          />
        </Box>
      </Stack>
      <Container maxWidth="xl" sx={{ paddingBlock: 8 }}>
        <Stack gap={3} alignItems="center" style={{ width: '100%' }}>
          <Card sx={{ backgroundColor: '#36C46C', width: '80%', padding: '20px' }}>
            <CardContent>
              <Typography variant="body1" sx={{ color: '#FFFFFF' , textAlign: 'center'}}>
                Stack Surge is dedicated to help you find volunteer opportunities at community and private events! See the our list of events to find the one best suited for you and volunteer today!
              </Typography>
            </CardContent>
          </Card>

          <Stack direction="row" spacing={2} justifyContent="center" width="100%">
            {events ? events.slice(0, 3).map((event) => (
              <Card
                key={event._id}
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
                    backgroundImage: `url(${event.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></Box>

                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ textAlign: 'center', color: '#FFFFFF' }}>
                    {event.title}
                  </Typography>
                </CardContent>
              </Card>
            )) : (
              <CircularProgress />
            )}
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
      </Container>
    </Stack>
  )
}
