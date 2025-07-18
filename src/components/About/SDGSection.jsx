import React from 'react';
import { Box, Typography, Paper, Chip, Button, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SDGS = [
  {
    num: 1,
    title: 'No Poverty',
    desc: 'Boosting incomes for smallholder farmers through fair markets and training.',
    color: '#E5243B',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg',
  },
  {
    num: 2,
    title: 'Zero Hunger',
    desc: 'Providing nutritious, affordable local rice (Aviella Parboiled Rice).',
    color: '#DDA63A',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg',
  },
  {
    num: 5,
    title: 'Gender Equality',
    desc: 'Empowering women across farming and processing.',
    color: '#FF3A21',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg',
  },
  {
    num: 6,
    title: 'Clean Water & Sanitation',
    desc: 'Using water-efficient, eco-friendly processing methods.',
    color: '#26BDE2',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-06.jpg',
  },
  {
    num: 7,
    title: 'Affordable & Clean Energy',
    desc: 'Powering operations with rice husk biofuel and solar.',
    color: '#FCC30B',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg',
  },
  {
    num: 8,
    title: 'Decent Work & Economic Growth',
    desc: 'Creating dignified jobs in rural communities.',
    color: '#A21942',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg',
  },
  {
    num: 9,
    title: 'Industry, Innovation & Infrastructure',
    desc: 'Using clean tech and circular systems.',
    color: '#FD6925',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg',
  },
  {
    num: 11,
    title: 'Sustainable Cities & Communities',
    desc: 'Strengthening rural economies and reducing migration.',
    color: '#F79C26',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg',
  },
  {
    num: 12,
    title: 'Responsible Consumption & Production',
    desc: 'Promoting zero-waste, circular rice processing.',
    color: '#BF8B2E',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-12.jpg',
  },
  {
    num: 13,
    title: 'Climate Action',
    desc: 'Promoting regenerative farming and carbon-reducing practices.',
    color: '#3F7E44',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg',
  },
  {
    num: 17,
    title: 'Partnerships for the Goals',
    desc: 'Collaborating with NGOs, farmer groups, and innovators.',
    color: '#19486A',
    icon: 'https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg',
  },
];

const SDGSection = () => (
  <Box sx={{ py: 8, px: { xs: 1, md: 8 }, backgroundColor: '#f8f9fa' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
      Our Commitment to the SDGs
    </Typography>
    <Typography align="center" sx={{ mb: 4, color: 'text.secondary', fontSize: '1.15rem', maxWidth: 700, mx: 'auto' }}>
      Timoya Farms supports 11 key Sustainable Development Goals (SDGs) through our inclusive, climate-smart, and clean energy-powered rice value chain:
    </Typography>
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        600: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }}
      style={{ paddingBottom: 40 }}
    >
      {SDGS.map((sdg) => (
        <SwiperSlide key={sdg.num}>
          <Paper sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#fff',
            minHeight: 320,
            maxWidth: 280,
            width: 260,
            mx: 'auto',
          }}>
            <Box sx={{ mb: 2, width: 64, height: 64, borderRadius: 2, overflow: 'hidden', boxShadow: 1, border: `3px solid ${sdg.color}` }}>
              <img src={sdg.icon} alt={`SDG ${sdg.num} icon`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </Box>
            <Chip label={`SDG ${sdg.num}`} sx={{ background: sdg.color, color: '#fff', fontWeight: 700, mb: 1, fontSize: 16 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1, textAlign: 'center' }}>{sdg.title}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>{sdg.desc}</Typography>
          </Paper>
        </SwiperSlide>
      ))}
    </Swiper>
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Button variant="contained" color="primary" size="large" component={Button} href="https://sdgs.un.org/goals" target="_blank" rel="noopener" sx={{ fontWeight: 'bold', borderRadius: 3, px: 5 }}>
        Learn more about the SDGs
      </Button>
    </Box>
  </Box>
);

export default SDGSection; 