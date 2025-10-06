import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb'

const Impact = () => {
  return (
    <Box sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Breadcrumb links={[{ label: 'Home', href: '/' }, { label: 'Our Impact', href: '/impact' }]} />
          <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mt: 2 }}>Our Impact</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1, mb: 3 }}>
            Empowering farmers through fair pricing, training, and community development. More details coming soon.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

export default Impact