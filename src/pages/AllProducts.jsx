import React, { useContext, useState, useMemo } from 'react'
import ShopBanner from '../components/Banner/ShopBanner';
import ProductList from '../components/Product/ProductList';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useApi from '../hooks/useApi';
import CartContext from '../Store/CartContext';
import { Helmet } from 'react-helmet-async';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AllProducts = () => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const cartContext = useContext(CartContext);

    // Debounce search input
    React.useEffect(() => {
        const handler = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(handler);
    }, [search]);

    // Build filter param for backend
    const filter = useMemo(() => {
        if (!debouncedSearch) return '{}';
        return JSON.stringify({ productName: { $regex: debouncedSearch, $options: 'i' } });
    }, [debouncedSearch]);

    const { data: products = [], error, loading } = useApi(`${baseUrl}/products?filter=${encodeURIComponent(filter)}`);

    const handleAddToCart = (product) => {
        if (cartContext?.addToCart) {
            cartContext.addToCart({ ...product, qty: 1 });
        } else {
            console.error('CartContext is not available.');
        }
    };

    return (
        <div>
            <Helmet>
                <title>All Products | Timoya Farms</title>
                <meta name="description" content="Browse all fresh produce and products available at Timoya Farms. Quality, sustainability, and freshness delivered to your door." />
                <meta property="og:title" content="All Products | Timoya Farms" />
                <meta property="og:description" content="Browse all fresh produce and products available at Timoya Farms. Quality, sustainability, and freshness delivered to your door." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://timoya-farms.com/products" />
            </Helmet>
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
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <TextField
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search products..."
                        variant="outlined"
                        size="small"
                        sx={{ width: { xs: '90%', sm: 400 } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
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
