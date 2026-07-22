"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  priceId: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];

  addToCart: (item: CartItem) => void;

  removeFromCart: (id: string) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem) {
            if (existingItem.quantity === 3) return state;
            return {
              items: state.items.map((cartItem) =>
                cartItem.id === item.id
                  ? {
                    ...cartItem,
                    quantity: cartItem.quantity + 1,
                  }
                  : cartItem
              ),
            };
          }

          return {
            items: [...state.items, item],
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      increaseQuantity: (id) => {
        set((state) => {
          const item = state.items.find((item) => item.id === id);

          if (!item || item.quantity === 3) return state;

          return {
            items: state.items.map((item) =>
              item.id === id
                ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
                : item
            ),
          };
        });
      },

      decreaseQuantity: (id) => {
        set((state) => {
          const item = state.items.find((item) => item.id === id);

          if (!item) return state;

          if (item.quantity === 1) {
            return {
              items: state.items.filter((item) => item.id !== id),
            };
          }

          return {
            items: state.items.map((item) =>
              item.id === id
                ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
                : item
            ),
          };
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);