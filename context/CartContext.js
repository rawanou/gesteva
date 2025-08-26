// context/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

const parsePrice = (p) => {
  if (p == null) return 0;
  if (typeof p === "number") return p;
  if (typeof p === "string") {
    // garde uniquement chiffres, '.' et ','
    const cleaned = p.replace(/[^\d.,-]/g, "").replace(",", ".");
    const n = parseFloat(cleaned);
    return isNaN(n) ? 0 : n;
  }
  return 0;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Ajouter en s'assurant que price est un nombre
  const addToCart = (service) => {
    const price = parsePrice(service.price);
    const item = { ...service, price };
    setCart((prev) => [...prev, item]);
  };

  // Supprimer par index
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
