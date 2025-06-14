import { Box, Grid } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'

const ProductList = (props) => {
    return (
        <Box sx={{ mb: 2 }}>
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    maxWidth: { xs: '100%', sm: '100%', md: 1200 },
                    margin: '0 auto',
                }}
            >
                {props.products && props.products.length > 0 ? (
                    props.products.map((product) => (
                        <Grid
                            key={product.id}
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "stretch"
                            }}
                        >
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <ProductCard
                                    id={product.id}
                                    title={product.title}
                                    price={product.price}
                                    image={product.image}
                                    description={product.description}
                                    product={product}
                                    onAddToCart={props.onAddToCart}
                                />
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </Grid>
        </Box>
    );
};

export default ProductList;
