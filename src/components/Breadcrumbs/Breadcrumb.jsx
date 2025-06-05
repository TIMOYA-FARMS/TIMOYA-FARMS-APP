import React from 'react';
import { Box, Breadcrumbs, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Breadcrumb = ({ links }) => {
  const theme = useTheme(); // Access MUI theme
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Responsive check

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        px: 2,
        py: 1,
        boxShadow: 1,
        mt: isSmallScreen ? 2 : 0,
        position: isSmallScreen ? 'static' : 'absolute',
        top: !isSmallScreen ? 16 : 'auto',
        left: !isSmallScreen ? 16 : 'auto',
        width: isSmallScreen ? '70%' : 'auto',
        zIndex: 10,
      }}
    >
      <Breadcrumbs
        separator={<ArrowForwardIosIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {links.map((link, index) => {
          if (index === links.length - 1) {
            return (
              <Typography
                key={index}
                color="text.primary"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: isSmallScreen ? '0.875rem' : '1rem',
                }}
              >
                {link.icon}
                {link.label}
              </Typography>
            );
          }
          return (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={link.href}
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: isSmallScreen ? '0.875rem' : '1rem',
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default Breadcrumb;
