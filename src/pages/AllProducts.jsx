import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ShopBanner from '../components/Banner/ShopBanner';
import ProductList from '../components/Product/ProductList';

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
      <ShopBanner />
      <ProductList products={products} />
    </div>
  )
}

export default AllProducts
