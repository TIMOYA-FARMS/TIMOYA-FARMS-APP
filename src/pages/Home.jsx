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
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useEffect } from 'react';

const taglines = [
  'Your one-stop destination for fresh, organic produce—delivered with care.',
  'Farm-fresh quality, straight to your door.',
  'Eat healthy. Live better. Choose Timoya Farms.',
];

const AnimatedLeaves = () => (
  <Box sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1,
  }}>
    {/* Example floating SVG leaves/particles */}
    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
      <circle cx="10%" cy="20%" r="8" fill="#b2f7ef" opacity="0.3">
        <animate attributeName="cy" values="20%;80%;20%" dur="8s" repeatCount="indefinite" />
      </circle>
      <circle cx="80%" cy="60%" r="12" fill="#e0ffe7" opacity="0.25">
        <animate attributeName="cy" values="60%;10%;60%" dur="10s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="50%" cy="10%" rx="18" ry="8" fill="#fffde4" opacity="0.18">
        <animate attributeName="cy" values="10%;90%;10%" dur="12s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  </Box>
);

const SectionDivider = ({ flip }) => (
  <Box sx={{ width: '100%', overflow: 'hidden', lineHeight: 0, background: 'none' }}>
    <svg
      viewBox="0 0 1440 80"
      style={{ display: 'block', width: '100%', height: 60, transform: flip ? 'rotate(180deg)' : 'none' }}
      preserveAspectRatio="none"
    >
      <path
        d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z"
        fill="#f9f9f9"
        opacity="1"
      />
    </svg>
  </Box>
);

const Home = () => {
  const images = [
    'https://timoyafarms.com/wp-content/uploads/2023/10/photo_23_2023-10-19_19-45-24-1.jpg',
    'https://images.unsplash.com/photo-1655102713930-ed68081e6b7d?q=80&w=2083&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1627276272485-e45905a6aedb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://timoyafarms.com/wp-content/uploads/2023/10/IMG-20230222-WA0006.jpg',
  ];
  const [taglineIdx, setTaglineIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
      <Box
        sx={{
          height: { xs: '60vh', sm: '70vh', md: '80vh' },
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <AnimatedLeaves />
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
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: index === 0 ? 'none' : `url(${image}) center/cover no-repeat`,
                }}
              >
                {index === 0 && (
                  <img
                    src={image.replace('/upload/', '/upload/w_1200,h_600,c_fill/')}
                    alt="Timoya Farms Hero"
                    width="1200"
                    height="600"
                    fetchpriority="high"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 0,
                    }}
                  />
                )}
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
                    maxWidth: { xs: '95%', sm: '80%', md: '60%' },
                    zIndex: 2,
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
                      fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                      minHeight: { xs: 40, sm: 48, md: 56 },
                      transition: 'all 0.5s',
                    }}
                  >
                    {taglines[taglineIdx]}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Button
                      component={Link}
                      to="/products"
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
                  </Box>
                </Box>
                {/* Scroll Down Indicator */}
                <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 24, display: 'flex', justifyContent: 'center', zIndex: 3 }}>
                  <KeyboardArrowDownIcon sx={{ fontSize: 48, color: 'white', opacity: 0.7, animation: 'bounce 2s infinite' }} />
                </Box>
                <style>{`
                  @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(12px); }
                  }
                `}</style>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <SectionDivider />
      <HomeAboutPreview />
      <SectionDivider flip />
      <HomeFeaturedProducts />
      <SectionDivider />
      <HomeHowItWorks />
      <SectionDivider flip />
      <HomeGalleryPreview />
      <SectionDivider />
      <Testimonials />
      <SectionDivider flip />
      <HomeBlogHighlights />
      <SectionDivider />
      <HomeNewsletterSignup />
      <SectionDivider flip />
      <HomeCTABanner />
      <SectionDivider />
      <HomePartners />
    </Box>
  );
};

export default Home;
