import React from 'react';
import { Box, Typography } from '@mui/material';

const partners = [
  { name: 'Ministry of Food & Agriculture', logo: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1751970293/MoF_a5qcsw.jpg' },
  { name: 'GhThink', logo: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1751970294/GhThink_udavrt.jpg' },
  { name: 'Kosmos Innovation Center', logo: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1751970294/kosmos_hzlkpt.jpg' },
  { name: 'Hopin Academy', logo: 'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1751970293/HOPin_mhl1in.jpg' },
];

const logoWidth = 100;
const logoHeight = 60;
const containerHeight = 120;
const textHeight = 36; // Enough for one line, ellipsis if longer

const HomePartners = () => (
  <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#f5f5f5', textAlign: 'center', overflow: 'hidden' }}>
    <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
      Our Partners & Certifications
    </Typography>
    <Typography variant="subtitle1" component="h3" sx={{ color: 'text.secondary', mb: 4, fontWeight: 500 }}>
      Trusted by leading brands and organizations.
    </Typography>
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        py: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'scrollLeft 18s linear infinite',
          gap: 6,
          width: 'fit-content',
          height: containerHeight,
        }}
      >
        {[...partners, ...partners].map((p, idx) => (
          <Box key={idx} sx={{ width: logoWidth + 24, height: containerHeight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            <img
              src={p.logo.replace('/upload/', `/upload/w_${logoWidth},h_${logoHeight},c_fit,f_webp/`)}
              srcSet={`
                ${p.logo.replace('/upload/', `/upload/w_${logoWidth},h_${logoHeight},c_fit,f_webp/`)} ${logoWidth}w,
                ${p.logo.replace('/upload/', `/upload/w_${logoWidth*2},h_${logoHeight*2},c_fit,f_webp/`)} ${logoWidth*2}w
              `}
              sizes={`${logoWidth}px`}
              alt={p.name}
              loading="lazy"
              style={{
                width: logoWidth,
                height: logoHeight,
                borderRadius: '12px',
                objectFit: 'contain',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                marginBottom: 8,
                padding: 6,
                border: '1px solid #eee',
                display: 'block',
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: 'text.secondary',
                fontWeight: 'bold',
                fontSize: 14,
                maxWidth: logoWidth + 16,
                textAlign: 'center',
                height: textHeight,
                lineHeight: `${textHeight}px`,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={p.name}
            >
              {p.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </Box>
  </Box>
);

export default HomePartners;
