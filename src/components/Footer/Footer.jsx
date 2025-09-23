import React from 'react';
import { Box, Typography, Link, IconButton, Stack, Grid, Divider, Avatar } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link as RouterLink } from 'react-router-dom';

// Use the provided logo
const logoUrl = 'https://res.cloudinary.com/dbyeirmqw/image/upload/v1749203410/timoya-farms-logo_pdaeob.png';

const socialLinks = [
  {icon: FacebookIcon, url: 'https://facebook.com/timoyafarms'},
  {icon: TwitterIcon, url: 'https://twitter.com/timoyafarms'},
  {icon: InstagramIcon, url: 'https://instagram.com/timoyafarms?hl=en'},
  {icon: LinkedInIcon, url: 'https://gh.linkedin.com/company/timoya-farms'}
// Add more social links as needed
]

const Footer = () => (
  <Box
    component="footer"
    sx={{
      background: 'linear-gradient(to right, rgba(33, 150, 83, 0.95), rgba(33, 150, 83, 0.8))',
      borderTop: '2px solid #e0e0e0',
      mt: 'auto',
      pt: 6,
      pb: 0,
    }}
  >
    <Grid 
      container 
      spacing={4} 
      sx={{ 
        maxWidth: 1200, 
        mx: 'auto',
        px: { xs: 2, md: 4 },
        justifyContent: 'space-around',
      }}
    >
      {/* Branding & Logo */}
      <Grid item xs={12} md={3.5} sx={{ textAlign: 'left' }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar src={logoUrl} alt="Timoya Farms Logo" sx={{ width: 60, height: 60, bgcolor: '#fff', border: '2px solid #FFD600' }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff', letterSpacing: 1 }}>
              Timoya Farms
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#FFD600' }}>
              Local. Natural. Sustainable
            </Typography>
          </Box>
        </Stack>
        <Typography variant="body2" sx={{ color: '#fff', opacity: 0.9, mb: 2 }}>
          Premium rice, grown with care in Ghana.
        </Typography>
      </Grid>

      {/* Quick Links */}
      <Grid item xs={12} md={3.5} sx={{ textAlign: 'left' }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 'bold', 
          mb: 2, 
          color: '#fff', 
          letterSpacing: 1,
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -4,
            left: 0,
            width: '40%',
            height: 2,
            background: 'linear-gradient(to right, #FFD600 0%, rgba(255, 214, 0, 0.1) 100%)'
          }
        }}>
          Quick Links
        </Typography>
        <Stack direction="column" spacing={1.5} alignItems="flex-start">
          <Link 
            component={RouterLink}
            to="/"
            underline="none" 
            sx={{ 
              color: '#fff',
              fontWeight: 500,
              fontSize: '1.1rem',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              '&:hover': { 
                color: '#FFD600',
                background: 'rgba(255, 255, 255, 0.1)',
                textDecoration: 'none'
              }
            }}
          >
            Home
          </Link>
          {['Products', 'About', 'Contact', 'FAQ'].map((item) => (
            <Link 
              key={item}
              href={`/${item.toLowerCase()}`} 
              underline="none" 
              sx={{ 
                color: '#fff',
                fontWeight: 500,
                fontSize: '1.1rem',
                px: 2,
                py: 0.5,
                borderRadius: 2,
                '&:hover': { 
                  color: '#FFD600',
                  background: 'rgba(255, 255, 255, 0.1)',
                  textDecoration: 'none'
                }
              }}
            >
              {item}
            </Link>
          ))}
        </Stack>
      </Grid>

      {/* Contact & Social */}
      <Grid item xs={12} md={3.5} sx={{ textAlign: 'left' }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 'bold', 
          mb: 2, 
          color: '#fff', 
          letterSpacing: 1,
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -4,
            left: 0,
            width: '40%',
            height: 2,
            background: 'linear-gradient(to right, #FFD600 0%, rgba(255, 214, 0, 0.1) 100%)'
          }
        }}>
          Contact Us
        </Typography>
        <Stack direction="column" spacing={2} alignItems="flex-start" sx={{ mb: 3 }}>
          {[
            { icon: <EmailIcon />, text: 'info@timoyafarms.com' },
            { icon: <PhoneIcon />, text: '+233 (0) 593786079 / 554343230' },
            { icon: <LocationOnIcon />, text: 'Saboba, Northern Region, Ghana' }
          ].map((item, index) => (
            <Stack key={index} direction="row" spacing={1.5} alignItems="center">
              <Box sx={{ color: '#FFD600' }}>{item.icon}</Box>
              <Typography sx={{ color: '#fff' }}>{item.text}</Typography>
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          {socialLinks.map(({icon: Icon, url}, index) => (
            <IconButton 
              key={index}
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${Icon.displayName}`}
              sx={{ 
                bgcolor: 'rgba(255, 214, 0, 0.1)',
                color: '#FFD600',
                '&:hover': { 
                  bgcolor: '#FFD600',
                  color: '#219653'
                }
              }}
            >
              <Icon />
            </IconButton>
          ))}
        </Stack>
      </Grid>
    </Grid>

    <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
    
    <Box sx={{ textAlign: 'center', pb: 3, px: { xs: 2, md: 4 } }}>
      <Typography variant="body2" sx={{ color: '#fff', opacity: 0.8 }}>
        © 2025 Timoya~Farms. All rights reserved.
    </Typography>
    </Box>
  </Box>
);

export default Footer;
