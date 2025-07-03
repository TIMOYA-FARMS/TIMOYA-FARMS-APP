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

const SectionDivider = () => (
  <Box sx={{ width: '100%', overflow: 'hidden', lineHeight: 0, background: 'none' }}>
    <svg
      viewBox="0 0 1440 80"
      style={{ display: 'block', width: '100%', height: 60 }}
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

const About = () => {
  return (
    <Box sx={{ background: '#f9f9f9', minHeight: '100vh' }}>
      {/* Banner with Breadcrumbs */}
      <Box sx={{ position: 'relative' , backgroundColor: '#f9f9f9', py: 0, px: 0 }}>
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
      <SectionDivider />
      <ByTheNumbers />
      <SectionDivider />
      <OurStory />
      <SectionDivider />
      <TimelineMilestones />
      <SectionDivider />
      <SustainabilityImpact />
      <SectionDivider />
      {/* Only show CertificationsAwards if real content exists */}
      {/* <CertificationsAwards /> */}
      <OurTeam />
      <SectionDivider />
      {/* Only show PressMedia if real content exists */}
      {/* <PressMedia /> */}
      <Testimonials />
      <SectionDivider />
      <AboutFAQ />
      <SectionDivider />
      <AboutCallToAction />
    </Box>
  );
};

export default About;
