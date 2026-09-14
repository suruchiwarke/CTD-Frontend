import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ctd_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ctd_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to local storage', e);
    }
  }, [cartItems]);

  const addToCart = (event) => {
    setCartItems((prev) => {
      if (prev.some((item) => item.id === event.id)) return prev;
      return [...prev, event];
    });
  };

  const removeFromCart = (eventId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== eventId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
