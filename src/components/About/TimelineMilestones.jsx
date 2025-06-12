import React, { useState } from 'react';
import { Box, Typography, Paper, Collapse } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import FactoryIcon from '@mui/icons-material/Factory';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const milestones = [
  {
    year: '2020',
    label: 'Timoya Farms Founded',
    desc: 'Timoya Farms is established with a mission to empower local rice farmers and deliver quality rice to consumers.',
    icon: <FlagIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />,
  },
  {
    year: '2021',
    label: 'Saboba Facility Launch',
    desc: 'Opened the Saboba processing facility, enabling local women to lead the parboiling process.',
    icon: <FactoryIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />,
  },
  {
    year: '2022',
    label: 'Circular Parboiling Innovation',
    desc: 'Developed and implemented a circular parboiling system, reducing processing time and improving rice quality.',
    icon: <AutorenewIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />,
  },
  {
    year: '2023',
    label: 'Community Impact Expansion',
    desc: 'Expanded partnerships with smallholder farmers and introduced eco-friendly packaging.',
    icon: <Diversity3Icon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />,
  },
  {
    year: '2024',
    label: 'Future Plans',
    desc: 'Plans underway to centralize operations and further scale sustainable impact.',
    icon: <TrendingUpIcon sx={{ fontSize: 48, color: 'info.main', mb: 1 }} />,
  },
];

const TimelineMilestones = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
        Our Journey & Milestones
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center', alignItems: 'stretch' }}>
        {milestones.map((m, idx) => (
          <Paper
            key={idx}
            sx={{ flex: 1, minWidth: 220, maxWidth: 320, p: 3, borderRadius: 2, backgroundColor: '#fff', textAlign: 'center', height: '100%', cursor: 'pointer', transition: 'box-shadow 0.2s', boxShadow: openIdx === idx ? 8 : 2 }}
            elevation={openIdx === idx ? 4 : 2}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            {m.icon}
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>{m.year}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{m.label}</Typography>
            <Collapse in={openIdx === idx}>
              <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>{m.desc}</Typography>
            </Collapse>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default TimelineMilestones;
