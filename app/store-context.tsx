"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  slug: string;
}

export type DrawerType = "cart" | "menu" | "categories" | "search" | "none";

interface StoreContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string, size: string) => void;
  updateCartQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  activeDrawer: DrawerType;
  setActiveDrawer: (drawer: DrawerType) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeDrawer, setActiveDrawer] = useState<DrawerType>("none");

  // Load cart and favorites from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("norie_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart data", e);
      }
    }

    const savedFavorites = localStorage.getItem("norie_favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed to parse favorites data", e);
      }
    }
  }, []);

  // Save cart and favorites on state changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("norie_cart", JSON.stringify(newCart));
  };

  const saveFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
    localStorage.setItem("norie_favorites", JSON.stringify(newFavorites));
  };

  const addToCart = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const qty = newItem.quantity ?? 1;
    const existingIndex = cart.findIndex(
      (item) => item.id === newItem.id && item.size === newItem.size
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += qty;
      saveCart(updatedCart);
    } else {
      saveCart([...cart, { ...newItem, quantity: qty }]);
    }
    setActiveDrawer("cart"); // Auto-open cart on add
  };

  const removeFromCart = (id: string, size: string) => {
    const updatedCart = cart.filter((item) => !(item.id === id && item.size === size));
    saveCart(updatedCart);
  };

  const updateCartQuantity = (id: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === id && item.size === size ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      saveFavorites(favorites.filter((favId) => favId !== id));
    } else {
      saveFavorites([...favorites, id]);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        favorites,
        toggleFavorite,
        activeDrawer,
        setActiveDrawer,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
