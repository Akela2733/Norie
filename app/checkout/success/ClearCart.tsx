"use client";

import { useEffect } from "react";
import { useStore } from "@/app/store-context";

export default function ClearCart() {
  const clearCart = useStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
