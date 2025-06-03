import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home = () => {
  const images = [
    'https://timoyafarms.com/wp-content/uploads/2023/10/photo_23_2023-10-19_19-45-24-1.jpg',
    'https://images.unsplash.com/photo-1655102713930-ed68081e6b7d?q=80&w=2083&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1627276272485-e45905a6aedb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://timoyafarms.com/wp-content/uploads/2023/10/IMG-20230222-WA0006.jpg',
  ];

  return (
    <Box
      sx={{
        height: '80vh',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        style={{ height: '100%' }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                height: '100%',
                width: '100%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 2,
                  padding: 3,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
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
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Home;
