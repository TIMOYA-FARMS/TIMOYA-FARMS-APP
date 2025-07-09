import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import {
  guestAddToCart,
  guestViewCart,
  guestUpdateCartItem,
  guestRemoveCartItem
} from './guestCartApi';

const CartContext = createContext({
    cart: [],
    cartLength: 0,
    addToCart: () => { },
    removeFromCart: () => { },
    updateCartItemQty: () => { },
    clearCart: () => { },
})

export const CartContextProvider = (props) => {
    const { user, isAuthenticated, token } = useAuth();
    const { showSuccess, showError, showInfo } = useNotification();
    const [cart, setCart] = useState([]);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    // Sync local cart to backend on login (for legacy carts)
    useEffect(() => {
        const syncCart = async () => {
            if (isAuthenticated) {
                // Just fetch backend cart
                fetchCart();
                window.localStorage.removeItem('cart');
            }
        };
        syncCart();
        // eslint-disable-next-line
    }, [isAuthenticated]);

    // Fetch user's cart from backend or guest cart
    const fetchCart = async () => {
        if (isAuthenticated) {
            try {
                const res = await axios.get(`${baseUrl}/cart/view`);
                const items = res.data.cart || res.data;
                setCart(items.map(item => ({
                    id: item.product._id || item.product.id || item.product,
                    cartItemId: item.id,
                    productName: item.product.productName || item.product.name || item.product.title || '',
                    title: item.product.title || item.product.name || '',
                    image: item.product.image || '',
                    price: item.product.price || 0,
                    description: item.product.description || '',
                    qty: item.quantity
                })));
            } catch (err) {
                // Error fetching cart
            }
        } else {
            try {
                const res = await guestViewCart();
                const items = res.data.cart || res.data;
                setCart(items.map(item => ({
                    id: item.product._id || item.product.id || item.product,
                    cartItemId: item.id,
                    productName: item.product.productName || item.product.name || item.product.title || '',
                    title: item.product.title || item.product.name || '',
                    image: item.product.image || '',
                    price: item.product.price || 0,
                    description: item.product.description || '',
                    qty: item.quantity
                })));
            } catch (err) {
                setCart([]);
            }
        }
    };

    // Add to cart
    const addToCart = async (newItem) => {
        const productName = newItem.productName || newItem.name || newItem.title || 'Product';
        
        if (isAuthenticated) {
            try {
                const productId = newItem._id || newItem.id;
                await axios.post(`${baseUrl}/cart/add`, {
                    product: productId,
                    quantity: 1
                });
                fetchCart();
                showSuccess(`${productName} added to cart!`, 'Cart Updated');
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Failed to add item to cart.';
                showError(errorMessage, 'Add to Cart Failed');
            }
        } else {
            try {
                const productId = newItem._id || newItem.id || newItem.productId;
                console.log('Adding to guest cart, productId:', productId, 'product:', newItem);
                if (!productId) {
                    console.error('No valid productId found in addToCart:', newItem);
                    showError('Invalid product information.', 'Add to Cart Failed');
                    return;
                }
                await guestAddToCart(productId, 1);
                fetchCart();
                showSuccess(`${productName} added to cart!`, 'Cart Updated');
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Failed to add item to cart.';
                showError(errorMessage, 'Add to Cart Failed');
            }
        }
    };

    // Remove from cart
    const removeFromCart = async (id, cartIdOverride = null) => {
        const item = cart.find(i => i.id === id);
        const productName = item?.productName || item?.title || 'Item';
        
        if (isAuthenticated) {
            try {
                let cartId = cartIdOverride;
                if (!cartId) {
                    cartId = item?.cartItemId;
                }
                if (cartId) {
                    await axios.delete(`${baseUrl}/cart/delete/${cartId}`);
                    fetchCart();
                    showSuccess(`${productName} removed from cart!`, 'Item Removed');
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Failed to remove item from cart.';
                showError(errorMessage, 'Remove Failed');
            }
        } else {
            try {
                let cartId = cartIdOverride;
                if (!cartId) {
                    cartId = item?.cartItemId || id;
                }
                await guestRemoveCartItem(cartId);
                fetchCart();
                showSuccess(`${productName} removed from cart!`, 'Item Removed');
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Failed to remove item from cart.';
                showError(errorMessage, 'Remove Failed');
            }
        }
    };

    // Update cart item quantity
    const updateCartItemQty = async (id, qty, cartIdOverride = null) => {
        const item = cart.find(i => i.id === id);
        const productName = item?.productName || item?.title || 'Item';
        
        // Prevent setting quantity to 0 or negative values
        if (qty <= 0) {
            showInfo('Quantity cannot be less than 1', 'Minimum Quantity');
            return;
        }
        
        if (isAuthenticated) {
            try {
                let cartId = cartIdOverride;
                if (!cartId) {
                    cartId = item?.cartItemId;
                }
                if (cartId) {
                    await axios.patch(`${baseUrl}/cart/update/${cartId}`, {
                        quantity: qty
                    });
                    fetchCart();
                    showSuccess(`Quantity updated to ${qty}`, 'Cart Updated');
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Failed to update cart quantity.';
                showError(errorMessage, 'Update Failed');
            }
        } else {
            try {
                let cartId = cartIdOverride;
                if (!cartId) {
                    cartId = item?.cartItemId || id;
                }
                await guestUpdateCartItem(cartId, qty);
                fetchCart();
                showSuccess(`Quantity updated to ${qty}`, 'Cart Updated');
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Failed to update cart quantity.';
                showError(errorMessage, 'Update Failed');
            }
        }
    };

    // Clear cart
    const clearCart = async () => {
        if (isAuthenticated) {
            try {
                for (const item of cart) {
                    if (item.cartItemId) {
                        try {
                            await axios.delete(`${baseUrl}/cart/delete/${item.cartItemId}`);
                        } catch (err) {}
                    }
                }
                fetchCart();
                showSuccess('All items removed from cart!', 'Cart Cleared');
            } catch (err) {
                showError('Failed to clear cart.', 'Clear Failed');
            }
        } else {
            // Remove all items from guest cart
            try {
                for (const item of cart) {
                    if (item.cartItemId) {
                        await guestRemoveCartItem(item.cartItemId);
                    }
                }
                setCart([]);
                showSuccess('All items removed from cart!', 'Cart Cleared');
            } catch (err) {
                setCart([]);
                showError('Failed to clear cart.', 'Clear Failed');
            }
        }
    };

    const context = {
        cart,
        cartLength: cart.reduce((sum, item) => sum + (item.qty || 1), 0),
        addToCart,
        removeFromCart,
        updateCartItemQty,
        clearCart,
        fetchCart
    };
    return (
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;