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
import ByTheNumbers from '../components/About/ByTheNumbers';


const breadcrumbLinks = [
  { href: '/', label: 'Home', icon: <HomeIcon sx={{ mr: 0.5 }} fontSize='small' /> },
  { href: '/about', label: 'About' },
];

const About = () => {
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
      {/* Banner with Breadcrumbs */}
      <Box sx={{ position: 'relative' , backgroundColor: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', py: 0, px: 0 }}>
        <Banner />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 0,
            mb: { xs: 0, md: 0 },
            width: '100%',
          }}
        >
          <Breadcrumb links={breadcrumbLinks} />
        </Box>
      </Box>
      <MissionVisionValues />
      <OurStory />
      {/* <ByTheNumbers /> */}
      <TimelineMilestones />
      <SustainabilityImpact />
      {/* Only show CertificationsAwards if real content exists */}
      {/* <CertificationsAwards /> */}
      <OurTeam />
      {/* Only show PressMedia if real content exists */}
      {/* <PressMedia /> */}
      <Testimonials />
      <AboutFAQ />
      <AboutCallToAction />
    </Box>
  );
};

export default About;
