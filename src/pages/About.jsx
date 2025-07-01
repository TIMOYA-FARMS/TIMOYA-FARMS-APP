import React from 'react';
import Banner from '../components/Banner/Banner';
import OurStory from '../components/About/OurStory';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OurTeam from '../components/About/OurTeam';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import Testimonials from '../components/Testimonials';
import MissionVisionValues from '../components/About/MissionVisionValues';
import TimelineMilestones from '../components/About/TimelineMilestones';
import SustainabilityImpact from '../components/About/SustainabilityImpact';
import CertificationsAwards from '../components/About/CertificationsAwards';
import PressMedia from '../components/About/PressMedia';
import AboutCallToAction from '../components/About/AboutCallToAction';
import AboutFAQ from '../components/About/AboutFAQ';


const breadcrumbLinks = [
  { href: '/', label: 'Home', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize='small' /> },
  { href: '/about', label: 'About' },
];

const About = () => {
  return (
    <Box>
      {/* Banner with Breadcrumbs */}
      <Box sx={{ position: 'relative' , backgroundColor: '#f9f9f9', py: 0, px: 0 }}>
        <Banner />
        <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt: 0,
    mb: { xs: 2, md: 4 },
    width: '100%',
  }}
>
  <Breadcrumb links={breadcrumbLinks} />
</Box>
      </Box>

      {/* Page Content */}
      <MissionVisionValues />
      <TimelineMilestones />
      <OurStory />
      <SustainabilityImpact />
      <CertificationsAwards />
      <OurTeam />
      <PressMedia />
      <Testimonials />
      <AboutFAQ />
      <AboutCallToAction />
    </Box>
  );
};

export default About;
