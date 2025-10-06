import React from 'react';
import { Box, Typography, Card, CardContent, Button, Avatar, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import RecyclingIcon from '@mui/icons-material/Recycling';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const featured = [
  {
    title: 'Premium Parboiled Rice – Our Best Seller',
    // desc: 'Perfect fluffy grains and balanced nutrition for everyday meals.',
    backDesc: 'Carefully parboiled to lock in nutrients and deliver consistent texture every time.',
    badge: 'Best Seller',
    icon: <RiceBowlIcon sx={{ fontSize: 32 }} />,
    iconBg: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
    iconColor: '#1976d2',
    link: '/products'
  },
  {
    title: 'Sustainable Packaging – Eco-Friendly Choices',
    // desc: 'Biodegradable, planet-friendly packaging across our product line.',
    backDesc: 'Biodegradable packaging reduces plastic waste and protects the environment.',
    badge: 'Eco',
    icon: <RecyclingIcon sx={{ fontSize: 32 }} />,
    iconBg: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    iconColor: '#2e7d32',
    link: '/sustainability'
  },
  {
    title: 'Empowering Farmers – Building Communities',
    // desc: 'Fair pricing, training, and long-term local partnerships.',
    backDesc: 'Partnerships that drive livelihoods, resilience, and lasting community impact.',
    badge: 'Community',
    icon: <HandshakeIcon sx={{ fontSize: 32 }} />,
    iconBg: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
    iconColor: '#f57c00',
    link: '/impact'
  },
  {
    title: 'Instant Rice Innovation – Cooks in 2 Minutes',
    // desc: 'Convenient, tasty, and ready fast—perfect for busy days.',
    backDesc: 'Crafted for busy lifestyles, Aviella Instant Rice cooks perfectly in under two minutes - nutritious, flavorful, and proudly made in Ghana.',
    badge: 'New',
    icon: <AccessTimeIcon sx={{ fontSize: 32 }} />,
    iconBg: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
    iconColor: '#7b1fa2',
    link: '/products#instant'
  },
];

const HomeFeaturedProducts = () => {
  return (
    <Box sx={{ 
      py: 8, 
      px: { xs: 2, sm: 3, md: 6 }, 
      backgroundColor: '#fff',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)'
    }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2, mb: 1 }}>
          Why Choose Timoya Farms
        </Typography>
        <Typography variant="h3" component="h2" sx={{ fontWeight: 800, color: 'primary.main', mb: 2 }}>
          Featured Highlights
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
          Premium quality, sustainable choices, and real community impact
        </Typography>
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(4, minmax(0, 1fr))',
        },
        gap: { xs: 3, sm: 4, md: 3 },
        maxWidth: 1200,
        mx: 'auto',
      }}>
        {featured.map((item, idx) => (
          <Card
            key={idx}
            component={Link}
            to={item.link}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 4,
              textDecoration: 'none',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
              border: '1px solid rgba(0,0,0,0.05)',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 8,
                '& .hover-overlay': {
                  opacity: 1,
                  transform: 'translateY(0)',
                  pointerEvents: 'auto',
                }
              },
            }}
          >
            {/* Icon Section */}
            <Box sx={{ 
              p: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,249,250,0.8) 100%)',
              position: 'relative'
            }}>
              <Chip
                label={item.badge}
                color={item.badge === 'Best Seller' ? 'secondary' : item.badge === 'Eco' ? 'success' : item.badge === 'New' ? 'warning' : 'primary'}
                size="small"
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16, 
                  fontWeight: 700, 
                  letterSpacing: 0.4,
                  boxShadow: 1
                }}
              />
              
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background: item.iconBg,
                  boxShadow: 3,
                  mb: 2,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Box sx={{ color: item.iconColor }}>
                  {item.icon}
                </Box>
              </Avatar>

              <Typography variant="h6" component="h3" sx={{ 
                fontWeight: 700, 
                color: 'primary.main',
                textAlign: 'center',
                lineHeight: 1.3,
                mb: 2
              }}>
                {item.title}
              </Typography>
            </Box>

            {/* Content Section */}
            <CardContent sx={{ flexGrow: 1, p: 3, pt: 0 }}>
              <Typography variant="body2" sx={{ 
                color: 'text.secondary',
                textAlign: 'center',
                lineHeight: 1.6,
                mb: 2
              }}>
                {item.desc}
              </Typography>
            </CardContent>
            
            {/* Full card overlay - covers entire card on hover */}
            <Box className="hover-overlay" sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              pointerEvents: 'none',
              borderRadius: 4,
            }}>
              <Typography variant="h6" component="h3" sx={{ 
                fontWeight: 700, 
                color: 'primary.main',
                textAlign: 'center',
                lineHeight: 1.3,
                mb: 3
              }}>
                {item.title}
              </Typography>
              
              <Typography variant="body2" sx={{ 
                color: 'text.secondary',
                textAlign: 'center',
                lineHeight: 1.6,
                mb: 3,
                maxWidth: '90%'
              }}>
                {item.backDesc}
              </Typography>
              
              <Button
                variant="contained"
                color="primary"
                size="medium"
                sx={{ 
                  fontWeight: 700, 
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none'
                }}
              >
                Explore
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button 
          component={Link} 
          to="/products" 
          variant="outlined" 
          color="primary" 
          size="large" 
          sx={{ 
            fontWeight: 700, 
            px: 6, 
            py: 1.5, 
            borderRadius: 3, 
            letterSpacing: 1,
            textTransform: 'none'
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default HomeFeaturedProducts;
