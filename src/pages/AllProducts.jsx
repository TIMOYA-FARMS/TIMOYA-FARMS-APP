import React, { useContext } from 'react'
import ShopBanner from '../components/Banner/ShopBanner';
import ProductList from '../components/Product/ProductList';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Box } from '@mui/material';
import useApi from '../hooks/useApi';
import CartContext from '../Store/CartContext';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AllProducts = () => {
    const { data: products = [], error, loading } = useApi(`${baseUrl}/products`);
    const cartContext = useContext(CartContext);

    const handleAddToCart = (product) => {
        if (cartContext?.addToCart) {
            cartContext.addToCart({ ...product, qty: 1 });
        } else {
            console.error('CartContext is not available.');
        }
    };

    return (
        <div>
            <Box sx={{ position: 'relative', backgroundColor: '#f9f9f9', py: 0, px: 0 }}>
                <ShopBanner />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 0,
                        mb: { xs: 2, md: 4 },
                        width: '100%',
                    }}
                >
                    <Breadcrumb
                        links={[
                            { label: 'Home', href: '/' },
                            { label: 'Products', href: '/products' },
                        ]}
                    />
                </Box>
            </Box>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Failed to load products.</p>}
            {!loading && !error && (
                <ProductList products={products} onAddToCart={handleAddToCart} />
            )}
        </div>
    );
};

export default AllProducts
