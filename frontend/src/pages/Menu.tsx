import { useCallback, useEffect, useState } from 'react';
import Nav from '../components/nav';
import background from '../assets/images/background.png';
import CardProducts from '../components/cards/cardProducts';
import SidebarProduct from '../components/sidebars/sidebarProduct';
import { api } from '../api/axios';
import { AnimatePresence } from 'framer-motion';
import { GiDesert } from "react-icons/gi";
import { MdMenuBook } from "react-icons/md";

type product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    imageUrl: string;
};

export default function Menu() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<product | null>(null);
    const [products, setProducts] = useState<product[]>([]);

    const handleCardClick = (product: product) => {
        setIsSidebarOpen(false);
        setTimeout(() => {
            setSelectedProduct(product);
            setIsSidebarOpen(true);
        }, 500);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
        setSelectedProduct(null);
    };

    const fetchProducts = useCallback(() => {
        api.get('/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const groupedProducts = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {} as Record<string, product[]>);

    return (
        <main
            className="flex transition-all duration-500 bg-center bg-cover bg-base-100 h-screen overflow-hidden"
            style={{ backgroundImage: `url(${background})` }}
        >
            <Nav 
                page = "Cardapio"
            />
            {
                products.length === 0 ? (
                    <div className="surge items-center flex flex-col text-8xl gap-8 py-9 text-base-400/50 h-screen w-full justify-center">
                        <GiDesert />
                        <p className="text-center text-base-400/50 text-2xl font-sigmar">
                            Você chegou cedo demais, ainda não temos produtos cadastrados.
                        </p>
                    </div>
                    
                ) : (
                <section className="pt-20 flex-1 flex">
                    <div className="flex flex-col md:w-[75%] w-full transition-all duration-500">
                        <h1 className="text-4xl md:text-start text-center md:pl-10 pt-4 text-base-400 font-sigmar pb-2 flex gap-2 justify-center md:justify-normal">
                            Cardápio
                            <MdMenuBook />
                        </h1>
                        <article className="p-8 overflow-y-auto invisible-scrollbar">
                            {
                                Object.entries(groupedProducts).map(([category, products]) => (
                                    <div key={category} className="mb-8">
                                        <h2 className="text-2xl text-base-400 font-bold mb-4 font-poppins border-b-2 border-base-400 pb-2 flex justify-between items-center">
                                            {category}
                                            <div className="bg-base-400 h-3 w-3 rounded-full"></div>
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                            {products.map((product) => (
                                                <CardProducts
                                                    key={product.id}
                                                    title={product.name}
                                                    price={product.price}
                                                    img={product.imageUrl}
                                                    onClick={() => handleCardClick(product)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))
                            }
                        </article>
                    </div>
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <SidebarProduct
                                selectedProduct={selectedProduct!}
                                handleCloseSidebar={handleCloseSidebar}
                            />
                        )}
                    </AnimatePresence>
                </section>
            )}
            
        </main>
    );
}
