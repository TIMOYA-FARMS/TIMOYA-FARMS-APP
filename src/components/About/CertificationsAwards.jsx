import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const certifications = [
  {
    title: 'Organic Certification (Pending)',
    desc: 'Our rice is produced using organic and sustainable methods. Certification process is underway.'
  },
  {
    title: 'Eco-Friendly Packaging Award',
    desc: 'Recognized for our commitment to reducing plastic waste with innovative packaging.'
  },
  {
    title: 'Community Impact Recognition',
    desc: 'Awarded by local organizations for empowering women and supporting smallholder farmers.'
  },
];

const CertificationsAwards = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#f5f5f5' }}>
    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
      Certifications & Awards
    </Typography>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center', alignItems: 'stretch' }}>
      {certifications.map((item, idx) => (
        <Paper key={idx} sx={{ flex: 1, minWidth: 0, p: 3, borderRadius: 2, textAlign: 'center', height: '100%' }} elevation={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>{item.title}</Typography>
          <Typography variant="body2" sx={{ color: '#555' }}>{item.desc}</Typography>
        </Paper>
      ))}
    </Box>
  </Box>
);

export default CertificationsAwards;
