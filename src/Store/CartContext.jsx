import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '../contexts/AuthContext';

const CartContext = createContext({
    cart: [],
    cartLength: 0,
    addToCart: () => { },
    removeFromCart: () => { },
    updateCartItemQty: () => { },
    clearCart: () => { },
})

const getInitialCart = () => {
    try {
        const storedCart = window.localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        // Error retrieving cart from localStorage
        return [];
    }
};

export const CartContextProvider = (props) => {
    const { user, isAuthenticated, token } = useAuth();
    const [cart, setCart] = useState(getInitialCart);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    // Sync local cart to backend on login
    useEffect(() => {
        const syncCart = async () => {
            if (isAuthenticated && cart.length > 0) {
                try {
                    for (const item of cart) {
                        await axios.post(`${baseUrl}/cart/add`, {
                            product: item.id,
                            quantity: item.qty
                        });
                    }
                    // After syncing, fetch backend cart
                    fetchCart();
                    window.localStorage.removeItem('cart');
                } catch (err) {
                    // Ignore errors for now
                }
            } else if (isAuthenticated) {
                // Just fetch backend cart
                fetchCart();
            }
        };
        syncCart();
        // eslint-disable-next-line
    }, [isAuthenticated]);

    // Fetch user's cart from backend
    const fetchCart = async () => {
        if (!isAuthenticated) return;
        try {
            const res = await axios.get(`${baseUrl}/cart/view`);
            console.log('Backend cart items:', res.data.cart || res.data);
            // Transform backend cart into UI cart shape
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
    };

    // Add to cart
    const addToCart = async (newItem) => {
        if (isAuthenticated) {
            try {
                // Always send the backend product _id, not id
                const productId = newItem._id || newItem.id;
                await axios.post(`${baseUrl}/cart/add`, {
                    product: productId,
                    quantity: 1
                });
                fetchCart();
            } catch (err) {
                // Handle error
            }
        } else {
            const isPresent = cart.some((item) => item.id === (newItem._id || newItem.id));
            if (isPresent) {
                setCart((prevCartState) =>
                    prevCartState.map((item) =>
                        item.id === (newItem._id || newItem.id) ? { ...item, qty: item.qty + 1 } : item
                    )
                );
            } else {
                setCart((prevCartState) => [...prevCartState, { ...newItem, id: newItem._id || newItem.id, qty: 1 }]);
            }
        }
    };


    // Remove from cart
    const removeFromCart = async (id, cartIdOverride = null) => {
        if (isAuthenticated) {
            try {
                let cartId = cartIdOverride;
                if (!cartId) {
                    const item = cart.find(i => i.id === id);
                    cartId = item?.cartItemId;
                }
                if (cartId) {
                    await axios.delete(`${baseUrl}/cart/delete/${cartId}`);
                    fetchCart();
                } else {
                    console.error('No cartItemId found for removeFromCart (backend requires cart item id)', { id, cart });
                }
            } catch (err) {
                console.error('Error removing from cart:', err);
            }
        } else {
            setCart((prevCartState) => prevCartState.filter(item => item.id !== id));
        }
    };


    // Update cart item quantity
    const updateCartItemQty = async (id, qty, cartIdOverride = null) => {
        if (isAuthenticated) {
            try {
                let cartId = cartIdOverride;
                if (!cartId) {
                    const item = cart.find(i => i.id === id);
                    cartId = item?.cartItemId;
                }
                if (cartId) {
                    await axios.patch(`${baseUrl}/cart/update/${cartId}`, {
                        quantity: qty
                    });
                    fetchCart();
                } else {
                    console.error('No cartItemId found for updateCartItemQty (backend requires cart item id)', { id, cart });
                }
            } catch (err) {
                console.error('Error updating cart item quantity:', err);
            }
        } else {
            setCart((prevCartState) =>
                prevCartState.map(item =>
                    item.id === id ? { ...item, qty } : item
                )
            );
        }
    };



    // Clear cart
    const clearCart = async () => {
        if (isAuthenticated) {
            // Remove all items from backend cart
            for (const item of cart) {
                if (item.cartItemId) {
                    try {
                        await axios.delete(`${baseUrl}/cart/delete/${item.cartItemId}`);
                    } catch (err) {}
                }
            }
            fetchCart();
        } else {
            setCart([]);
        }
    };

    // Persist local cart
    useEffect(() => {
        if (!isAuthenticated) {
            try {
                window.localStorage.setItem('cart', JSON.stringify(cart));
            } catch (error) {}
        }
    }, [cart, isAuthenticated]);

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