import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    q: 'Where is Timoya Farms located?',
    a: 'Our main facilities are in Saboba and Tamale, Ghana.'
  },
  {
    q: 'Is your rice organic?',
    a: 'We use organic and sustainable farming methods. Official certification is in progress.'
  },
  {
    q: 'How can I buy Timoya Farms rice?',
    a: 'You can purchase our rice directly from our website or at select local retailers.'
  },
  {
    q: 'How do you support local farmers?',
    a: 'We provide fair compensation, training, and market access to over 100 local farmers.'
  },
  {
    q: 'What makes your packaging eco-friendly?',
    a: 'We use biodegradable and recyclable materials to reduce plastic waste.'
  },
  {
    q: 'How can I partner with Timoya Farms?',
    a: 'Visit our Contact page to reach out about partnership opportunities.'
  },
];

const AboutFAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, backgroundColor: '#fff' }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4, color: 'primary.main' }}>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, idx) => (
        <Accordion key={idx} expanded={expanded === idx} onChange={handleChange(idx)}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{faq.q}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ color: '#555' }}>{faq.a}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default AboutFAQ;
