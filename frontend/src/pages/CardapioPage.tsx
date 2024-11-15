import { useCallback, useEffect, useState } from 'react';
import Nav from '../components/nav';
import background from '../assets/images/background.png';
import CardProducts from '../components/cardProducts';
import SidebarProduct from '../components/sidebarProduct';
import { api } from '../api/axios';
import { AnimatePresence } from 'framer-motion';

type product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    imageUrl: string;
}

export default function CardapioPage() {

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
        api.get('/products').then(response => {
        const products = response.data;
        setProducts(products);
        }).catch(error => {
            console.error(error);
        });
    }, []);


    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <main
            className="flex transition-all duration-500 bg-center bg-cover bg-base-100 h-screen overflow-hidden"
            style={{ backgroundImage: `url(${background})` }}
        >
            <Nav />
            <section className="pt-20 flex-1 flex">
                <div className="flex flex-col md:w-[75%] w-full transition-all duration-500">
                    <h1 className="text-4xl md:text-start text-center md:pl-10 pt-4 text-base-400 font-sigmar pb-2">
                        Cardápio
                    </h1>
                    <article className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8 gap-5 overflow-y-auto invisible-scrollbar">
                        {products.map((product) => (
                            <CardProducts
                                key={product.id}
                                title={product.name}
                                price={product.price}
                                img={product.imageUrl}
                                onClick={() => handleCardClick(product)}
                            />
                        ))}
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
        </main>
    );
}