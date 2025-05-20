// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// 1. Definición de acciones
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

// 2. Estado inicial: lo cargamos de localStorage si existe
const initialState = JSON.parse(localStorage.getItem('cart')) || [];

// 3. Reducer puro
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItemIndex = state.findIndex(
        item => item.id === action.payload.id && 
                item.talla === action.payload.talla && 
                item.color === action.payload.color
      );

      if (existingItemIndex >= 0) {
        return state.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              cantidad: item.cantidad + action.payload.cantidad
            };
          }
          return item;
        });
      }
      return [...state, action.payload];
    }

    case UPDATE_CART_ITEM:
      return state.map((item, index) => {
        if (index === action.payload.index) {
          return {
            ...item,
            cantidad: action.payload.cantidad
          };
        }
        return item;
      });

    case REMOVE_FROM_CART:
      return state.filter((_, index) => index !== action.payload);

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
}

// 4. Crear el contexto
const CartContext = createContext();

// 5. Provider
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // 6. Persistencia automática en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 7. Acciones expuestas
  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item });
  };

  const updateCartItem = (index, cantidad) => {
    dispatch({ type: UPDATE_CART_ITEM, payload: { index, cantidad } });
  };

  const removeFromCart = (index) => {
    dispatch({ type: REMOVE_FROM_CART, payload: index });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// 8. Hook de consumo
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};