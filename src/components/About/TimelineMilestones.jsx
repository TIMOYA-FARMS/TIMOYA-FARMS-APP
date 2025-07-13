import React, { useState } from 'react';
import { Box, Typography, Paper, Collapse } from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import FactoryIcon from '@mui/icons-material/Factory';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const milestones = [
  {
    year: '2022',
    label: 'Timoya Farms Founded',
    desc: 'Timoya Farms is established with a mission to empower local rice farmers and deliver quality rice to consumers.',
    icon: <FlagIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #219653 0%, #27ae60 100%)',
  },
  {
    year: '2022',
    label: 'Saboba Facility Launch',
    desc: 'Opened the Saboba processing facility, enabling local women to lead the parboiling process.',
    icon: <FactoryIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)',
  },
  {
    year: '2023',
    label: 'Parboiling Innovation',
    desc: 'Developed and implemented a circular parboiling system, reducing processing time and improving rice quality.',
    icon: <AutorenewIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
  },
  {
    year: '2023',
    label: 'Community Impact Expansion',
    desc: 'Expanded partnerships with smallholder farmers and introduced eco-friendly packaging.',
    icon: <Diversity3Icon sx={{ fontSize: 40, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
  },
  {
    year: '2024',
    label: 'Future Plans',
    desc: 'Plans underway to centralize operations and further scale sustainable impact.',
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #219653 0%, #2ecc71 100%)',
  },
];

const TimelineMilestones = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 }, backgroundColor: '#ffffff', position: 'relative' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 6, color: 'primary.main' }}>
        Our Journey & Milestones
      </Typography>
      
      {/* Timeline Container */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 3, 
        justifyContent: 'center', 
        alignItems: 'stretch',
        position: 'relative',
        maxWidth: 1200,
        mx: 'auto',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '5%',
          right: '5%',
          height: 3,
          background: 'linear-gradient(90deg, #219653, #f39c12, #2ecc71, #f39c12, #219653)',
          transform: 'translateY(-50%)',
          zIndex: 1,
          display: { xs: 'none', md: 'block' },
        }
      }}>
        {milestones.map((m, idx) => (
          <Box
            key={idx}
            sx={{
              position: 'relative',
              zIndex: 2,
              flex: 1,
              minWidth: { xs: '100%', md: 200 },
              maxWidth: { xs: '100%', md: 240 },
            }}
          >
            <Paper
              sx={{ 
                p: 3, 
                borderRadius: 4, 
                backgroundColor: '#fff', 
                textAlign: 'center', 
                height: '100%', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                boxShadow: openIdx === idx ? 12 : 4,
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: 16,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: m.gradient,
                  zIndex: 1,
                }
              }}
              elevation={openIdx === idx ? 8 : 4}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mb: 2,
                  p: 1.5,
                  borderRadius: '50%',
                  background: m.gradient,
                  width: 60,
                  height: 60,
                  mx: 'auto',
                  boxShadow: 4,
                }}>
                  {m.icon}
                </Box>
                
                <Typography variant="h6" sx={{ 
                  color: 'primary.main', 
                  fontWeight: 'bold', 
                  mb: 1,
                  background: m.gradient,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {m.year}
                </Typography>
                
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 'bold', 
                  mb: 2,
                  color: '#2c3e50',
                  fontSize: '0.9rem',
                }}>
                  {m.label}
                </Typography>
                
                <Collapse in={openIdx === idx}>
                  <Typography variant="body2" sx={{ 
                    color: '#555', 
                    mt: 2, 
                    lineHeight: 1.6,
                    textAlign: 'justify',
                    fontSize: '0.85rem',
                  }}>
                    {m.desc}
                  </Typography>
                </Collapse>
                
                <Typography variant="caption" sx={{ 
                  color: '#888', 
                  mt: 2, 
                  display: 'block',
                  fontStyle: 'italic',
                  fontSize: '0.75rem',
                }}>
                  {openIdx === idx ? 'Click to collapse' : 'Click to expand'}
                </Typography>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TimelineMilestones;
