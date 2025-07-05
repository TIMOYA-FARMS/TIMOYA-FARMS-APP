import React from 'react';
import { Box, Typography, Button, Stack, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const AboutCallToAction = () => (
  <Box sx={{ py: 8, px: { xs: 2, md: 8 }, background: 'linear-gradient(90deg, #fffde4 0%, #e0ffe7 100%)', textAlign: 'center', borderRadius: 4 }}>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
      Get Involved with Timoya Farms
    </Typography>
    <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
      Join our mission to empower farmers, promote sustainability, and deliver quality rice. Stay connected, partner with us, or become part of our growing community!
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 3 }}>
      <Button component={Link} to="/contact" variant="contained" color="primary" size="large">
        Contact Us
      </Button>
      <Button component={Link} to="/blog" variant="outlined" color="primary" size="large">
        Read Our Blog
      </Button>
      {/* <Button
        variant="outlined"
        color="primary"
        size="large"
        startIcon={<EmailIcon />}
        href="mailto:info@timoyafarms.com"
        sx={{ textTransform: 'none' }}
      >
        info@timoyafarms.com
      </Button> */}
    </Stack>
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      <Tooltip title="Email">
        <IconButton color="primary" href="mailto:info@timoyafarms.com">
          <EmailIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Twitter">
        <IconButton color="primary" href="#" target="_blank">
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="LinkedIn">
        <IconButton color="primary" href="#" target="_blank">
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  </Box>
);

export default AboutCallToAction;
