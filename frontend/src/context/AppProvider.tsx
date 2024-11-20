import { createContext, useState, ReactNode } from "react";

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
};

type CartContextType = {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productName: string) => void;
    clearCart: () => void;
    getTotalPrice: () => string;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
export const CartContext = createContext<CartContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [cartItems, setCartItems] = useState<Product[]>(() => {
        const storedCart = localStorage.getItem("cartItems");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const addUser = (newUser: User) => {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const removeUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const addToCart = (product: Product) => {
        setCartItems((prevItems) => {
            const existingProductIndex = prevItems.findIndex(
                (item) => item.name === product.name
            );
    
            if (existingProductIndex !== -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingProductIndex].quantity = product.quantity;
                localStorage.setItem("cartItems", JSON.stringify(updatedItems));
                return updatedItems;
            } else {
                const updatedItems = [...prevItems, product];
                localStorage.setItem("cartItems", JSON.stringify(updatedItems));
                return updatedItems;
            }
        });
    };

    const removeFromCart = (productName: string) => {
        setCartItems((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.name !== productName);
            localStorage.setItem("cartItems", JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem("cartItems");
    };

    const getTotalPrice = () => {
        return cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    return (
        <UserContext.Provider value={{ user, addUser, removeUser }}>
            <CartContext.Provider
                value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice }}
            >
                {children}
            </CartContext.Provider>
        </UserContext.Provider>
    );
};
