import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home = () => {
  return (
    <Box
      sx={{
        height: '100vh', // Full viewport height
        width: '100%',   // Full viewport width
        backgroundImage: 'url("https://dukaan.b-cdn.net/700x700/webp/download-and-upload/b6f9f52b-5b86-4983-97d5-8d0696e37929.jpeg")', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', // Flexbox for centering content
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2, // Optional padding for responsiveness
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black
          borderRadius: 2, // Rounded corners
          padding: 3, // Padding around the text
          textAlign: 'center', // Center-align text
        }}
      >
        <Typography variant="h2" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
          Welcome to Timoya Farms
        </Typography>
        <Typography variant="h6" sx={{ color: 'white', mb: 4 }}>
          Your one-stop destination for fresh and organic produce.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: 'bold',
            paddingX: 3,
            paddingY: 1,
            borderRadius: 2,
          }}
        >
          SHOP NOW
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
