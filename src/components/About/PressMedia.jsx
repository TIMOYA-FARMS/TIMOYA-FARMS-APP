import React from 'react';
import { Box, Typography, Grid, Paper, Link } from '@mui/material';

const pressMentions = [
  {
    title: 'Timoya Farms: Empowering Women in Agriculture',
    source: 'AgriBusiness Today',
    url: 'https://example.com/agri-business-today-timoya',
    date: 'March 2023',
  },
  {
    title: 'Innovative Rice Processing in Ghana',
    source: 'Green Africa News',
    url: 'https://example.com/green-africa-news-timoya',
    date: 'July 2022',
  },
  {
    title: 'Local Startup Wins Eco Packaging Award',
    source: 'Ghana News Online',
    url: 'https://example.com/ghana-news-timoya',
    date: 'November 2023',
  },
];

const PressMedia = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#fff' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      Press & Media
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center', alignItems: 'stretch' }}>
      {pressMentions.map((item, idx) => (
        <Paper key={idx} sx={{ flex: 1, minWidth: 0, p: 3, borderRadius: 2, textAlign: 'center', height: '100%' }} elevation={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>{item.title}</Typography>
          <Typography variant="body2" sx={{ color: '#555', mb: 1 }}>{item.source} &mdash; {item.date}</Typography>
          <Link href={item.url} target="_blank" rel="noopener" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
            Read Article
          </Link>
        </Paper>
      ))}
    </Box>
  </Box>
);

export default PressMedia;
