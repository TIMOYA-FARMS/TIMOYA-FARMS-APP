import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Testimonials from '../components/Testimonials';
import HomeAboutPreview from '../components/HomeAboutPreview';
import HomeFeaturedProducts from '../components/HomeFeaturedProducts';
import HomeHowItWorks from '../components/HomeHowItWorks';
import HomeGalleryPreview from '../components/HomeGalleryPreview';
import HomeBlogHighlights from '../components/HomeBlogHighlights';
import HomeNewsletterSignup from '../components/HomeNewsletterSignup';
import HomeCTABanner from '../components/HomeCTABanner';
import HomePartners from '../components/HomePartners';

const Home = () => {
  const images = [
    'https://timoyafarms.com/wp-content/uploads/2023/10/photo_23_2023-10-19_19-45-24-1.jpg',
    'https://images.unsplash.com/photo-1655102713930-ed68081e6b7d?q=80&w=2083&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1627276272485-e45905a6aedb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://timoyafarms.com/wp-content/uploads/2023/10/IMG-20230222-WA0006.jpg',
  ];

  return (
    <>
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
                    background: 'linear-gradient(135deg, rgba(34,43,69,0.7) 40%, rgba(33,150,83,0.5) 100%)',
                    boxShadow: 3,
                    borderRadius: 3,
                    padding: { xs: 2, sm: 4, md: 6 },
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: { xs: '90%', sm: '70%', md: '50%' },
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      color: 'white',
                      fontWeight: 900,
                      mb: 2,
                      letterSpacing: 1,
                      textShadow: '0 4px 24px rgba(0,0,0,0.5)',
                      fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
                    }}
                  >
                    Welcome to Timoya Farms
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'white',
                      mb: 4,
                      fontWeight: 400,
                      textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                      fontSize: { xs: '1rem', sm: '1.4rem', md: '1.8rem' },
                    }}
                  >
                    Your one-stop destination for fresh, organic produce—delivered with care.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      sx={{
                        fontWeight: 700,
                        px: 5,
                        py: 1.5,
                        borderRadius: 3,
                        boxShadow: '0 2px 8px rgba(255,184,0,0.2)',
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        textTransform: 'uppercase',
                        transition: 'all 0.3s',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                          boxShadow: '0 4px 16px rgba(33,150,83,0.18)',
                        },
                      }}
                    >
                      Shop Now
                    </Button>
                    {/* Show Login button if not logged in */}
                    {false && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        href="/login"
                        sx={{
                          fontWeight: 700,
                          px: 5,
                          py: 1.5,
                          borderRadius: 3,
                          fontSize: { xs: '1rem', sm: '1.2rem' },
                          textTransform: 'uppercase',
                          borderWidth: 2,
                          borderColor: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                          },
                        }}
                      >
                        Login
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <HomeAboutPreview />
      <HomeFeaturedProducts />
      <HomeHowItWorks />
      <HomeGalleryPreview />
      <Testimonials />
      <HomeBlogHighlights />
      <HomeNewsletterSignup />
      <HomeCTABanner />
      <HomePartners />
    </>
  );
};

export default Home;
