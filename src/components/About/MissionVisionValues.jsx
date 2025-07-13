import React, { useState } from 'react';
import { Box, Typography, Paper, Collapse } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PublicIcon from '@mui/icons-material/Public';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupsIcon from '@mui/icons-material/Groups';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';

const values = [
  {
    title: 'Integrity',
    desc: 'We uphold honesty and transparency in all our dealings with farmers, partners, and customers.',
    icon: <VerifiedUserIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #219653 0%, #27ae60 100%)',
  },
  {
    title: 'Sustainability',
    desc: 'We are committed to eco-friendly practices that protect the environment and empower local communities.',
    icon: <PublicIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)',
  },
  {
    title: 'Innovation',
    desc: 'We embrace new technologies and ideas to improve the rice value chain and deliver quality products.',
    icon: <LightbulbIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
  },
  {
    title: 'Community',
    desc: 'We believe in supporting and uplifting the people who make our mission possible.',
    icon: <GroupsIcon sx={{ fontSize: 48, color: 'white', mb: 1 }} />,
    gradient: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
  },
];

const MissionVisionValues = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 }, backgroundColor: '#ffffff' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
        Our Mission, Vision & Values
      </Typography>
      
      {/* Mission & Vision Cards */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 6, justifyContent: 'center' }}>
        <Paper 
          sx={{ 
            flex: 1, 
            p: 4, 
            borderRadius: 4, 
            boxShadow: 1, 
            minWidth: 0,
            background: 'linear-gradient(135deg, #219653 0%, #27ae60 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 8,
              transition: 'all 0.3s ease',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.1)',
              zIndex: 1,
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FlagIcon sx={{ fontSize: 32, mr: 2, color: 'rgba(255,255,255,0.9)' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                Mission
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8 }}>
              To bridge the gap between local farmers and consumers by providing high-quality, sustainably processed rice while empowering smallholder farmers and cooperatives.
            </Typography>
          </Box>
        </Paper>
        
        <Paper 
          sx={{ 
            flex: 1, 
            p: 4, 
            borderRadius: 4, 
            boxShadow: 1, 
            minWidth: 0,
            background: 'linear-gradient(135deg, #f39c12 0%, #f1c40f 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: 8,
              transition: 'all 0.3s ease',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255,255,255,0.1)',
              zIndex: 1,
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <VisibilityIcon sx={{ fontSize: 32, mr: 2, color: 'rgba(255,255,255,0.9)' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                Vision
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8 }}>
              To be a leading force in sustainable agriculture, transforming lives and communities through innovation, quality, and environmental stewardship.
            </Typography>
          </Box>
        </Paper>
      </Box>
      
      {/* Core Values Section */}
      <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
        Our Core Values
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, justifyContent: 'center' }}>
        {values.map((v, idx) => (
          <Paper
            key={idx}
            sx={{ 
              flex: 1, 
              minWidth: 0, 
              p: 4, 
              borderRadius: 4, 
              textAlign: 'center', 
              height: '100%', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              boxShadow: openIdx === idx ? 4 : 2,
              background: v.gradient,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow: 12,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255,255,255,0.1)',
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
                '& .MuiSvgIcon-root': {
                  color: 'rgba(255,255,255,0.9) !important',
                }
              }}>
                {v.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 2 }}>{v.title}</Typography>
              <Collapse in={openIdx === idx}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mt: 2, lineHeight: 1.6 }}>{v.desc}</Typography>
              </Collapse>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', mt: 1, display: 'block' }}>
                {openIdx === idx ? 'Click to collapse' : 'Click to expand'}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default MissionVisionValues;
