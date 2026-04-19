import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import axiosClient from '../services/axiosClient';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart: either from API (Member) or LocalStorage (Guest)
  const fetchCart = useCallback(async () => {
    if (user) {
      setLoading(true);
      try {
        const response = await axiosClient.get('/cart');
        if (response.success) {
          setCartItems(response.data.items || []);
        }
      } catch (error) {
        console.error('Failed to fetch cart from API', error);
      } finally {
        setLoading(false);
      }
    } else {
      const localCart = localStorage.getItem('guest_cart');
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      }
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Sync logic: When user logs in, move local items to server
  useEffect(() => {
    const syncCart = async () => {
      if (user) {
        const localCart = localStorage.getItem('guest_cart');
        if (localCart) {
          try {
            const items = JSON.parse(localCart);
            // Calling a special sync endpoint (we'll implement this logic in Backend if needed, 
            // or just loop add)
            for (const item of items) {
              await axiosClient.post('/cart/add', {
                variant_id: item.variant_id,
                quantity: item.quantity
              });
            }
            localStorage.removeItem('guest_cart');
            fetchCart(); // Refresh from server
          } catch (error) {
            console.error('Sync failed', error);
          }
        }
      }
    };
    syncCart();
  }, [user, fetchCart]);

  const addToCart = async (variant, quantity) => {
    if (user) {
      try {
        await axiosClient.post('/cart/add', {
          variant_id: variant.id,
          quantity: quantity
        });
        fetchCart();
      } catch (error) {
        throw error;
      }
    } else {
      const newItems = [...cartItems];
      const existing = newItems.find(i => i.variant_id === variant.id);
      
      if (existing) {
        existing.quantity += quantity;
      } else {
        newItems.push({
          variant_id: variant.id,
          quantity: quantity,
          // Store minimal product info for offline display
          product_name: variant.product_name || 'Product',
          price: variant.base_price,
          image_url: variant.image_url
        });
      }
      
      setCartItems(newItems);
      localStorage.setItem('guest_cart', JSON.stringify(newItems));
    }
  };

  const removeFromCart = async (variantId) => {
    if (user) {
      try {
        await axiosClient.delete(`/cart/remove/${variantId}`);
        fetchCart();
      } catch (error) {
        console.error('Remove failed', error);
      }
    } else {
      const newItems = cartItems.filter(i => i.variant_id !== variantId);
      setCartItems(newItems);
      localStorage.setItem('guest_cart', JSON.stringify(newItems));
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      loading, 
      addToCart, 
      removeFromCart, 
      getCartCount, 
      getCartTotal,
      refreshCart: fetchCart 
    }}>
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
