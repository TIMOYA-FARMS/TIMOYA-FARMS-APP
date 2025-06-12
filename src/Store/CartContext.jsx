import { createContext, useEffect, useState } from "react";

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
    const [cart, setCart] = useState(getInitialCart);

    const addToCart = (newItem) => {

        const isPresent = cart.some((item) => item.id === newItem.id);
        if (isPresent) {
            setCart((prevCartState) =>
                prevCartState.map((item) =>
                    item.id === newItem.id ? { ...item, qty: item.qty + 1 } : item
                )
            );
        } else {
            setCart((prevCartState) => [...prevCartState, { ...newItem, qty: 1 }]);
        }
    };

    useEffect(() => {
        try {
            window.localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            // Error saving cart to localStorage
        }
    }, [cart]);

    const context = {
        cart,
        cartLength: cart.length,
        addToCart,
        removeFromCart: (id) => {
            setCart((prevCartState) => prevCartState.filter(item => item.id !== id));
        },
        updateCartItemQty: (id, qty) => {
            setCart((prevCartState) =>
                prevCartState.map(item =>
                    item.id === id ? { ...item, qty } : item
                )
            );
        },
        clearCart: () => {
            setCart([]);
        }
    }
    return (
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;