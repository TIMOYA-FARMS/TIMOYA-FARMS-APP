import React, { useState } from 'react';
import { Box, Typography, Paper, Collapse } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PublicIcon from '@mui/icons-material/Public';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupsIcon from '@mui/icons-material/Groups';

const values = [
  {
    title: 'Integrity',
    desc: 'We uphold honesty and transparency in all our dealings with farmers, partners, and customers.',
    icon: <VerifiedUserIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />,
  },
  {
    title: 'Sustainability',
    desc: 'We are committed to eco-friendly practices that protect the environment and empower local communities.',
    icon: <PublicIcon sx={{ fontSize: 48, color: 'success.main', mb: 1 }} />,
  },
  {
    title: 'Innovation',
    desc: 'We embrace new technologies and ideas to improve the rice value chain and deliver quality products.',
    icon: <LightbulbIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />,
  },
  {
    title: 'Community',
    desc: 'We believe in supporting and uplifting the people who make our mission possible.',
    icon: <GroupsIcon sx={{ fontSize: 48, color: 'secondary.main', mb: 1 }} />,
  },
];

const MissionVisionValues = () => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#fff' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
        Our Mission, Vision & Values
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, mb: 4, justifyContent: 'center' }}>
        <Paper sx={{ flex: 1, p: 4, borderRadius: 3, boxShadow: 2, minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
            Mission
          </Typography>
          <Typography variant="body1" sx={{ color: '#555' }}>
            To bridge the gap between local farmers and consumers by providing high-quality, sustainably processed rice while empowering smallholder farmers and cooperatives.
          </Typography>
        </Paper>
        <Paper sx={{ flex: 1, p: 4, borderRadius: 3, boxShadow: 2, minWidth: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
            Vision
          </Typography>
          <Typography variant="body1" sx={{ color: '#555' }}>
            To be a leading force in sustainable agriculture, transforming lives and communities through innovation, quality, and environmental stewardship.
          </Typography>
        </Paper>
      </Box>
      <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
        Our Core Values
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, justifyContent: 'center' }}>
        {values.map((v, idx) => (
          <Paper
            key={idx}
            sx={{ flex: 1, minWidth: 0, p: 3, borderRadius: 2, textAlign: 'center', height: '100%', cursor: 'pointer', transition: 'box-shadow 0.2s', boxShadow: openIdx === idx ? 8 : 1 }}
            elevation={openIdx === idx ? 4 : 1}
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
          >
            {v.icon}
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>{v.title}</Typography>
            <Collapse in={openIdx === idx}>
              <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>{v.desc}</Typography>
            </Collapse>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default MissionVisionValues;
