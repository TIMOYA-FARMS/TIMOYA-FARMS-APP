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
  const heroSlides = [
    {
      image: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1752066985/Hero_farm_1_ffkbu4.jpg',
      title: 'Grown in Ghana, Trusted on Every Table',
      tagline: `Aviella Rice is proudly cultivated by Ghana's smallholder farmers, bringing rich nutrition and local pride to our plate.`
    },
    {
      image: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1752066985/Hero_goldenRice_2_a5qvnt.jpg',
      title: 'Parboiled to Perfection',
      tagline: 'Enjoy wholesome, fluffy grains - carefully processed through our clean-energy system for maximum nutrition.'
    },
    {
      image: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1752066985/Hero_happyCustomer_4_af7fjs.jpg',
      title: 'Every Bag Empowers a Farmer.',
      tagline: 'With every purchase, you support smallholder farmers, local livelihoods, and sustainable agriculture in Ghana.'
    },
    {
      image: 'https://timoyafarms.com/wp-content/uploads/2023/10/IMG-20230222-WA0006.jpg',
      title: 'Happy Customers',
      tagline: 'Join our community of happy, healthy customers!'
    },
  ];

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
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: '100%',
                  width: '100%',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  alignItems: 'center',
                  background: index === 0 ? 'none' : `url(${slide.image}) center/cover no-repeat`,
                }}
              >
                {/* Gradient overlay for image contrast */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    background: 'linear-gradient(90deg, rgba(34,43,69,0.55) 40%, rgba(33,150,83,0.25) 100%)',
                  }}
                />
                {index === 0 && (
                  <img
                    src={slide.image.replace('/upload/', '/upload/w_1200,h_600,c_fill/')}
                    alt={slide.title}
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
                    position: 'relative',
                    zIndex: 2,
                    // background: 'rgba(255,255,255,0.10)',
                    backdropFilter: 'blur(1px)',
                    // boxShadow: 3,
                    borderRadius: 3,
                    padding: { xs: 2, sm: 4, md: 6 },
                    textAlign: { xs: 'center', md: 'left' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    maxWidth: { xs: '95%', sm: '80%', md: '45%' },
                    left: { xs: 0, md: 40 },
                    minHeight: { xs: 180, sm: 220, md: 260 },
                    maxHeight: { xs: 220, sm: 260, md: 300 },
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      color: 'white',
                      fontWeight: 900,
                      mb: 2,
                      letterSpacing: 1,
                      textShadow: '0 4px 24px rgba(0,0,0,0.5)',
                      fontSize: { xs: '2rem', sm: '2.8rem', md: '3.5rem' },
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      color: 'white',
                      mb: 3,
                      fontWeight: 400,
                      textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.15rem' },
                      lineHeight: 1.5,
                      minHeight: { xs: 40, sm: 48, md: 56 },
                      transition: 'all 0.5s',
                      maxHeight: { xs: 80, sm: 120, md: 160 },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 3, sm: 4, md: 5 },
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {slide.tagline}
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
      {/* <SectionDivider /> */}
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
      {/* <SectionDivider /> */}
      <HomeNewsletterSignup />
      {/* <SectionDivider flip /> */}
      <HomeCTABanner />
      {/* <SectionDivider /> */}
      <HomePartners />
    </Box>
  );
};

export default Home;
