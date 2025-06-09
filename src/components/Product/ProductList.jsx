import { Box, Grid } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'

const ProductList = (props) => {
    return (
        <Box sx={{mb: 2}}>
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: { xs: "center", sm: "center", md: "flex-start" },
                    alignItems: "center",
                }}
            >
                {props.products.map((product) => (
                    <Grid
                        key={product.id}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <ProductCard
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            description={product.description}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};


export default ProductList
