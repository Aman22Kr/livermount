import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Coupon, COUPONS, PRODUCTS } from '../data/mockData';

export interface CartItem {
  id: string; // unique item entry id
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedFinish?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  pincode: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string;
  status: 'Confirmed' | 'Dispatched' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  shippingAddress: Address;
  paymentMethod: string;
}

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  searchHistory: string[];
  savedAddresses: Address[];
  orders: Order[];
  appliedCoupon: Coupon | null;
  appliedCouponDiscount: number;
  toasts: Toast[];
  addToCart: (product: Product, quantity?: number, color?: string, finish?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addRecentlyViewed: (productId: string) => void;
  addSearchQuery: (query: string) => void;
  clearSearchHistory: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  saveAddress: (address: Omit<Address, 'id'>) => Address;
  placeOrder: (shippingAddress: Address, paymentMethod: string) => Order;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
  cartTotal: number;
  cartOriginalTotal: number;
  cartItemsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'livermount_cart_v1',
  WISHLIST: 'livermount_wishlist_v1',
  RECENTLY_VIEWED: 'livermount_recent_v1',
  SEARCH_HISTORY: 'livermount_searches_v1',
  ADDRESSES: 'livermount_addresses_v1',
  ORDERS: 'livermount_orders_v1',
};

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-default-1',
    fullName: 'Aman Kumar',
    phone: '+91 98765 43210',
    pincode: '400050',
    street: 'Flat 402, Sea Green Heights, Turner Road',
    landmark: 'Near National College',
    city: 'Mumbai',
    state: 'Maharashtra',
    isDefault: true,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'LM-84920',
    date: '16 Oct 2026',
    items: [
      {
        productId: 'lm-sofa-01',
        productName: 'Marlowe 3-Seater Reversible Sectional Sofa in Terracotta',
        price: 34999,
        quantity: 1,
        image: '/src/assets/images/category_sofas_lounges_1792475854188.jpg',
      },
    ],
    subtotal: 34999,
    discount: 3500,
    shipping: 0,
    total: 31499,
    couponCode: 'LIVERMOUNT10',
    status: 'In Transit',
    estimatedDelivery: '22 Oct 2026',
    shippingAddress: DEFAULT_ADDRESSES[0],
    paymentMethod: 'UPI (Google Pay)',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage safely
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return stored ? JSON.parse(stored) : ['lm-sofa-01', 'lm-decor-01'];
    } catch {
      return ['lm-sofa-01', 'lm-decor-01'];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
      return stored ? JSON.parse(stored) : ['lm-sofa-01', 'lm-bed-01', 'lm-dining-01'];
    } catch {
      return ['lm-sofa-01', 'lm-bed-01', 'lm-dining-01'];
    }
  });

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return stored ? JSON.parse(stored) : ['Solid Teak Wood Bed', 'Sectional Sofa', 'Floor Lamp', 'Dining Table 6 Seater'];
    } catch {
      return ['Solid Teak Wood Bed', 'Sectional Sofa', 'Floor Lamp', 'Dining Table 6 Seater'];
    }
  });

  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      return stored ? JSON.parse(stored) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(savedAddresses));
  }, [savedAddresses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, color?: string, finish?: string) => {
    const itemId = `${product.id}-${color || 'default'}-${finish || 'default'}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          quantity,
          selectedColor: color || product.colors?.[0] || 'Default',
          selectedFinish: finish || product.finish,
        },
      ];
    });
    showToast(`Added "${product.name.slice(0, 32)}..." to your cart!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist actions
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from Wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Added to Wishlist ❤️');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Recently viewed
  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  // Search history
  const addSearchQuery = (query: string) => {
    const clean = query.trim();
    if (!clean) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== clean.toLowerCase());
      return [clean, ...filtered].slice(0, 8);
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  // Cart calculations
  const cartOriginalTotal = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Coupon
  const applyCoupon = (code: string) => {
    const upper = code.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === upper);
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try LIVERMOUNT10 or FESTIVE25.' };
    }
    if (cartTotal < found.minOrder) {
      return {
        success: false,
        message: `Min order value for ${found.code} is ₹${found.minOrder.toLocaleString('en-IN')}`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`);
    return { success: true, message: `Applied ${found.code}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const appliedCouponDiscount = appliedCoupon
    ? Math.min((cartTotal * appliedCoupon.discountPercent) / 100, appliedCoupon.maxDiscount)
    : 0;

  // Address
  const saveAddress = (addr: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addr,
      id: `addr-${Date.now()}`,
    };
    setSavedAddresses((prev) => [newAddress, ...prev]);
    showToast('Delivery address saved');
    return newAddress;
  };

  // Order placement
  const placeOrder = (shippingAddress: Address, paymentMethod: string): Order => {
    const orderItems: OrderItem[] = cart.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.images[0] || '',
    }));

    const finalPayable = Math.max(0, cartTotal - appliedCouponDiscount);
    const newOrder: Order = {
      id: `LM-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      items: orderItems,
      subtotal: cartTotal,
      discount: appliedCouponDiscount,
      shipping: 0,
      total: finalPayable,
      couponCode: appliedCoupon?.code,
      status: 'Confirmed',
      estimatedDelivery: '26 Oct 2026',
      shippingAddress,
      paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewed,
        searchHistory,
        savedAddresses,
        orders,
        appliedCoupon,
        appliedCouponDiscount,
        toasts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addRecentlyViewed,
        addSearchQuery,
        clearSearchHistory,
        applyCoupon,
        removeCoupon,
        saveAddress,
        placeOrder,
        showToast,
        dismissToast,
        cartTotal,
        cartOriginalTotal,
        cartItemsCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
