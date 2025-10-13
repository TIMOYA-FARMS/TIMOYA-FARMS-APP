import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import NewsCard from './NewsCard';

const articles = [
    {
        title: 'KIC supports Timoya Farms to demonstrate innovation in Rice Processing',
        source: 'Kosmos Innovation Center',
        date: '2025-03-20',
        summary:
            'In the heart of Ghana’s agribusiness revolution, Timoya Farms stands as a beacon of transformation in rice processing. As a Kosmos Innovation Center (KIC) supported business, Timoya Farms is...',
        image:
            'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1760281997/Timoya-product-pix-2_hyvfx7.jpg',
        link: 'https://share.google/iRWai1Dpb9nk5xkBA',
        category: 'Innovation',
    },
    {
        title: 'Timoya Farms pioneers innovation in rice processing with KIC support',
        source: 'Graphic Online',
        date: '2025-03-21',
        summary:
            'Timoya Farms, a rising force in Ghana’s rice industry, is spearheading innovation in rice processing with the backing of the Kosmos Innovation Center (KIC) and the Mastercard Foundation...',
        image:
            'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1760281996/TIMOYA-FARMS-LADY_exvqez.jpg',
        link: 'https://share.google/iyaqKXcbMgGJd8jjW',
        category: 'Innovation',
    },
    {
        title: '3 Ghanaian social entrepreneurs awarded funding, continuous support via Komseko Social Enterprise Programme',
        source: 'Citi Newsroom',
        date: '2023-07-07',
        summary:
            '...the final 3 award winners. Hiqmat Sungdeme Saani (Baabuh Hub), Moses J. Tiborgnan (Timoya Farms), and Portia Dumba (PorduCare) were awarded GHC6000 each to continue working on their social enterprises...',
        image:
            'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1760334429/Komseko-SE-FW-Finale-Pic-1-1140x570_gjgrvh.jpg',
        link: 'https://share.google/27acBR4q1sXLLpVQY',
        category: 'Awards',
    },
    {
        title: 'Cohort Incubation pitch, the role of Entrepreneurs in Social Development',
        source: 'B&FT Online',
        date: '2022-08-03',
        summary:
            'Training the youth in entrepreneurship programmes to develop their inner skills for job opportunities is the surest way to curb the unemployment rate in the country...',
        image:
            'https://res.cloudinary.com/dgwp3bvrr/image/upload/v1760335166/HOPin_Training_Session_vgfdxa.jpg',
        link: 'https://share.google/ikhVcZ6CYemPhnu29',
        category: 'Entrepreneurship',
    },
];


const NewsList = () => {
    return (
        <Box sx={{ py: 6, px: { xs: 2, md: 6 }, backgroundColor: 'background.default' }}>
            <Typography
                variant='h4'
                align='center'
                sx={{ mb: 4, fontWeight: '700', color: 'primary.main' }}
            >
                News & Featured Articles
            </Typography>

            <Container maxWidth='lg'>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, minmax(0, 1fr))',
                            md: 'repeat(4, minmax(0, 1fr))',
                            // lg: 'repeat(4, 1fr)'
                        },
                        gap: { xs: 3, sm: 4, md: 3 },
                        width: '100%',
                        mx: 'auto'

                    }}
                >
                    {articles.map((article, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                display: 'flex',
                                width: '100%'
                            }}
                        >
                            <NewsCard article={article} />
                        </Box>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default NewsList;
