import React, { createContext, useContext, useState, useEffect } from 'react';
import CartNotificationBanner from '../components/cart-added-modal';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  slug: string;
  imageUrl?: string;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  recentlyAddedItem: CartItem | null;
  closeAddedModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [recentlyAddedItem, setRecentlyAddedItem] = useState<CartItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prev, newItem];
    });

    setRecentlyAddedItem(newItem);
    setIsModalOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const closeAddedModal = () => {
    setIsModalOpen(false);
  };

  const total = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        recentlyAddedItem,
        closeAddedModal,
      }}
    >
      {children}
      <CartNotificationBanner
        item={recentlyAddedItem}
        isOpen={isModalOpen}
        onClose={closeAddedModal}
        cartTotalCount={totalItemCount}
        cartSubtotal={total}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
