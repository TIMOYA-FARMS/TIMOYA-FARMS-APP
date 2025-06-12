import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ShopBanner from '../components/Banner/ShopBanner';
import ProductList from '../components/Product/ProductList';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { Box } from '@mui/material';

const AllProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(() => res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {

      })
  }, []);
  return (
    <div>
      <Box sx={{ position: 'relative', backgroundColor: '#f9f9f9', py: 0, px: 0 }}>
        <ShopBanner />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: { xs: 2, md: 3 },
            mb: { xs: 2, md: 4 },
            width: '100%',
          }}
        >
          <Breadcrumb
            links={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' }
            ]}
          />
        </Box>
      </Box>
      <ProductList products={products} />
    </div>
  )
}

export default AllProducts
