import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    q: 'What is Timoya Farms?',
    a: 'Timoya Farms is an agroprocessing company based in Saboba, Ghana. We empower smallholder farmers with climate-smart practices and process their paddy into Aviella Parboiled Rice, a nutritious, premium-quality rice brand.'
  },
  {
    q: 'What makes Timoya Farms different from other rice processors?',
    a: 'We use a circular parboiling system that reduces waste, conserves energy, and improves rice quality. At the same time, we work directly with farmers to ensure fair prices, empowerment, and community growth'
  },
  {
    q: 'What is Aviella Parboiled Rice?',
    a: 'Aviella Parboiled Rice is rice that has been partially boiled in its husk before milling, locking in nutrients and giving it a rich golden color, fluffy texture, and enhanced taste.'
  },
  {
    q: 'Is parboiled rice healthy?',
    a: 'Yes. Parboiled rice retains more vitamins and minerals than white rice. It also has a low glycemic index, making it a healthier option for people with diabetes or those managing weight.'
  },
  {
    q: 'What sizes does Aviella Rice come in?',
    a: 'We currently package Aviella Rice in 5kg, 10kg, and 25kg bags to serve households, restaurants, and bulk buyers.'
  },
  {
    q: 'Where can I buy Aviella Rice?',
    a: 'You can purchase directly from our shop page, at select retailers, or through distribution partners across Ghana.'
  },
  {
    q: 'How do I cook Aviella Parboiled Rice?',
    a: `For soft fluffy grains: Cook with 2 cups of water for every cup of rice. 
    For fried rice/jollof: Slightly reduce the water for firmer grains. A cooking guide is available on our website.`
  },
  {
    q: 'Does Aviella Rice spoil?',
    a: 'No, when stored in a cool, dry place, Aviella Rice has a long shelf life without losing quality.'
  },
  {
    q: 'How does Timoya Farms support smallholder farmers?',
    a: 'We train farmers on climate-smart agriculture, provide access to markets, and pay fair prices for their paddy. Our model increases farmer income while promoting sustainability.'
  },
  {
    q: 'How many farmers do you work with?',
    a: 'We are currently working with hundreds of smallholder farmers in Saboba and neighboring districts, with plans to expand across Ghana.'
  },
  {
    q: 'Can I partner with Timoya Farms?',
    a: 'Yes! We welcome partnerships in distribution, investment, farmer support, and sustainability programs. Contact us via our [Partnerships Page].'
  },
  {
    q: 'Are you open to investors?',
    a: 'Yes. We are scaling our operations and welcome strategic investors aligned with our mission to modernize Ghana’s rice value chain.'
  },
  {
    q: 'How do I contact Timoya Farms?',
    a: `📍 Saboba, Northern Region, Ghana
        📧 info@timoyafarms.com

        📞 +233 (0) 593786079/554343230`
  },
];

const AboutFAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 8 }, backgroundColor: '#ffffff' }}>
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
