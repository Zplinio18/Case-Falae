import { createContext, useState, useEffect, ReactNode } from "react";

type User = {
    name: string;
    email: string;
    address: string;
    phone: string;
    id: string;
    isAdmin: boolean;
};

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    imageUrl: string;
    quantity: number;
};

type UserContextType = {
    user: User | null;
    addUser: (newUser: User) => void;
    removeUser: () => void;
    isLoading: boolean;
    errorMessage: string;
};

type CartContextType = {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    getTotalPrice: () => string;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
export const CartContext = createContext<CartContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const addUser = (newUser: User) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const removeUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const addToCart = (product: Product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <UserContext.Provider value={{ user, addUser, removeUser, isLoading, errorMessage: "" }}>
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
        </UserContext.Provider>
    );
};