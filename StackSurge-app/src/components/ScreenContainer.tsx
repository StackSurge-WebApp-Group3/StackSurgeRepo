import type { ReactNode } from 'react'

import Container from '@mui/material/Container'
import type { SxProps, Theme } from '@mui/material'

type ScreenContainerProps = {
  children: ReactNode
  sx?: SxProps<Theme>
}

export function ScreenContainer({ children, sx }: ScreenContainerProps) {
  return (
    <Container
      maxWidth='lg'
      sx={{
        minHeight: 'calc(100vh - 69px)',
        paddingBlock: 6,
        ...sx,
      }}
    >
      {children}
    </Container>
  )
}
