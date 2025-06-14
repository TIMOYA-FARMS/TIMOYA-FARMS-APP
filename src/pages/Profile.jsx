import React from 'react'
import { Box, Typography, Button } from '@mui/material';

const Profile = () => {
  const isLoggedIn = false; // Replace with real auth logic
  if (!isLoggedIn) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          My Profile
        </Typography>
        <Typography variant="body1" sx={{ color: 'error.main', mb: 3 }}>
          You must <a href="/login" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Login</a> or <a href="/register" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 700 }}>Register</a> to view your profile.
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 3, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
        My Profile
      </Typography>
      {/* Profile details go here */}
    </Box>
  )
}

export default Profile
