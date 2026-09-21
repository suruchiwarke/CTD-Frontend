import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartApi } from '../api/cart';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const EMPTY_CART = { bill: 0, events: [] };

// The cart lives on the backend; this context mirrors it. Mutations throw on
// failure so the caller can show the backend's message (e.g. "already in your cart").
export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(EMPTY_CART);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(EMPTY_CART);
      setError('');
      return;
    }
    setIsLoading(true);
    try {
      setCart(await cartApi.view());
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = async (payload) => {
    const res = await cartApi.add(payload);
    await refreshCart();
    return res;
  };

  const removeFromCart = async (eventName) => {
    const res = await cartApi.remove(eventName);
    await refreshCart();
    return res;
  };

  const checkout = async (utr) => {
    const res = await cartApi.checkout(utr);
    await refreshCart();
    return res;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cart.events,
        bill: cart.bill,
        isLoading,
        error,
        refreshCart,
        addToCart,
        removeFromCart,
        checkout,
        cartCount: cart.events.length,
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
