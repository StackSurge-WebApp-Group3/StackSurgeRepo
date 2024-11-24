import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { AppPath } from '../router/routes'
import { ScreenContainer } from '../components/ScreenContainer'

export function Home() {
  const navigate = useNavigate()

  return (
    <ScreenContainer>
      <Stack gap={3} alignItems="center" style={{ width: '100%' }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
          Home
        </Typography>
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
