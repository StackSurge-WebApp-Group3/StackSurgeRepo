import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

import { AppPath } from '../router/routes'
import { ScreenContainer } from '../components/ScreenContainer'

import Logo from '../assets/CircleLogo.png'

export function Home() {
  const navigate = useNavigate()

  return (
    <ScreenContainer>
      <Box
        sx={{
          width: '100%',
          height: '50vh',
          backgroundColor: '#006633',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomLeftRadius: '50% 30%',
          borderBottomRightRadius: '50% 30%',
        }}
      >

        <Typography variant="h2" component="h1" sx={{ textAlign: 'center', color: '#FFFFFF' }}>
          Welcome To
        </Typography>

        <img 
          src={Logo} 
          alt="Logo" 
          style={{ width: '300px', height: '300px', marginBottom: '20px' }} 
        />
      </Box>

      <Stack gap={3} alignItems="center" style={{ width: '100%' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(AppPath.Login);
          }}
        >
          Login
        </Button>
      </Stack>
    </ScreenContainer>
  )
}
