import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { ScreenContainer } from '../components/ScreenContainer'

export function AboutUs() {
  return (
    <ScreenContainer>
      <Stack gap={3} alignItems="center" style={{ width: '100%' }}>
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
          About Us
        </Typography>
      </Stack>
    </ScreenContainer>
  )
}
