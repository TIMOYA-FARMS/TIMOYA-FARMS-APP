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
import HomeSDGTeaser from '../components/HomeSDGTeaser';
import { Helmet } from 'react-helmet-async';

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
  const [imageSize, setImageSize] = useState('1200x600');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [displayedTagline, setDisplayedTagline] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setImageSize('600x300');
      } else if (width <= 900) {
        setImageSize('900x450');
      } else {
        setImageSize('1200x600');
      }
    };

    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentTagline = heroSlides[currentSlide]?.tagline || '';
    // If on small screen, skip typing animation
    if (imageSize === '600x300') {
      setDisplayedTagline(currentTagline);
      setIsTyping(false);
      return;
    }
    setDisplayedTagline('');
    setIsTyping(true);

    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < currentTagline.length) {
        setDisplayedTagline(currentTagline.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 30); // Adjust speed here (lower = faster)

    return () => clearInterval(typeInterval);
  }, [currentSlide, imageSize]);

  const getResponsiveImageUrl = (imageUrl) => {
    if (imageUrl.includes('cloudinary.com')) {
      const [width, height] = imageSize.split('x');
      const responsiveUrl = imageUrl.replace('/upload/', `/upload/f_auto,q_auto,w_${width},h_${height},c_fill/`);
      return responsiveUrl;
    }
    return imageUrl;
  };

  const heroSlides = [
    {
      image: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1752066985/Hero_farm_1_ffkbu4.jpg',
      title: 'Grown in Ghana, Trusted on Every Table',
      tagline: `Aviella Rice! proudly cultivated by Ghana's smallholder farmers, bringing rich nutrition and local pride to our plate.`
    },
    {
      image: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1752391017/processing_machine_ibuugb.jpg',
      title: 'Parboiled to Perfection',
      tagline: 'Enjoy wholesome, fluffy grains - carefully processed through our clean-energy system for maximum nutrition.'
    },
    {
      image: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1752066985/Hero_happyCustomer_4_af7fjs.jpg',
      title: 'Every Bag Empowers a Farmer.',
      tagline: 'Every purchase, supports smallholder farmers, local livelihoods, & sustainable agriculture in Ghana.'
    },
    {
      image: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1752391017/Happy_Customers_lwmnkw.jpg',
      title: 'Happy Customers',
      tagline: 'Join our community of happy, healthy customers!'
    },
  ];

  return (
    <Box sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
      <Helmet>
        <title>Timoya Farms | Healthy Ghana Rice | Sustainable Rice Farming</title>
        <meta name="description" content="Healthy Ghana rice, sustainable rice farming in Africa, eco-friendly rice packaging, and fast cooking rice from Timoya Farms." />
        <meta name="keywords" content="Healthy Ghana Rice, Sustainable Rice Farming in Africa, Eco-Friendly Rice Packaging, Fast Cooking Rice, Aviella Rice, parboiled rice Ghana, buy rice Ghana, biodegradable rice packaging" />
      </Helmet>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '50vh', sm: '65vh', md: '80vh', lg: '90vh', xl: '95vh' },
          overflow: 'hidden',
          maxWidth: '100vw',
          maxHeight: '100vh',
        }}
      >
        <AnimatedLeaves />
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 15000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          style={{ 
            height: '100%',
            width: '100%',
            overflow: 'hidden'
          }}
          wrapperStyle={{
            height: '100%',
            width: '100%',
          }}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.realIndex);
          }}
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
                  overflow: 'hidden',
                  maxWidth: '100%',
                }}
              >
                {/* Responsive Background Image for all slides */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                    backgroundImage: `url(${getResponsiveImageUrl(slide.image)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                  }}
                />

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
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    backdropFilter: 'blur(1px)',
                    borderRadius: 3,
                    padding: { xs: 3, sm: 4, md: 6 },
                    textAlign: { xs: 'center', md: 'left' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    maxWidth: { xs: '90%', sm: '80%', md: '45%' },
                    left: { xs: 0, md: 40 },
                    minHeight: { xs: 200, sm: 220, md: 260 },
                    maxHeight: { xs: 280, sm: 300, md: 520 },
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
                      fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem', lg: '3.5rem' },
                      lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                      animation: index === currentSlide ? 'fadeIn 0.8s ease-in' : 'none',
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
                      fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
                      lineHeight: 1.5,
                      minHeight: { xs: 48, sm: 56, md: 64 },
                      transition: 'all 0.5s',
                      maxHeight: { xs: 96, sm: 120, md: 160 },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 3, sm: 4, md: 5 },
                      WebkitBoxOrient: 'vertical',
                      position: 'relative',
                      animation: imageSize === '600x300' ? 'fadeIn 0.8s ease-in' : 'none',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        right: '-2px',
                        top: '0',
                        height: '100%',
                        width: '2px',
                        backgroundColor: 'white',
                        animation: isTyping && imageSize !== '600x300' ? 'blink 1s infinite' : 'none',
                        display: isTyping && imageSize !== '600x300' ? 'block' : 'none',
                      },
                    }}
                  >
                    {imageSize === '600x300' ? slide.tagline : (index === currentSlide ? displayedTagline : slide.tagline)}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    flexWrap: 'wrap', 
                    justifyContent: 'center',
                    width: '100%',
                    mt: { xs: 1, sm: 2 }
                  }}>
                    <Button
                      component={Link}
                      to="/products"
                      variant="contained"
                      color="secondary"
                      size="large"
                      sx={{
                        fontWeight: 700,
                        px: { xs: 4, sm: 5 },
                        py: { xs: 1.2, sm: 1.5 },
                        borderRadius: 3,
                        boxShadow: '0 2px 8px rgba(255,184,0,0.2)',
                        fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
                        textTransform: 'uppercase',
                        transition: 'all 0.3s',
                        minWidth: { xs: '140px', sm: '160px' },
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
                <Box sx={{ 
                  position: 'absolute', 
                  left: 0, 
                  right: 0, 
                  bottom: { xs: 16, sm: 24 }, 
                  display: 'flex', 
                  justifyContent: 'center', 
                  zIndex: 3 
                }}>
                  <KeyboardArrowDownIcon sx={{ 
                    fontSize: { xs: 36, sm: 48 }, 
                    color: 'white', 
                    opacity: 0.7, 
                    animation: 'bounce 2s infinite' 
                  }} />
                </Box>
                <style>{`
                  @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(12px); }
                  }
                  @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                  }
                  @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
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
      <HomeSDGTeaser />
      {/* <SectionDivider flip /> */}
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
