import { motion } from 'framer-motion';
import { useState } from 'react';
import { useEffect } from 'react';
import DefaultButton from '../buttons/defaultButton';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from 'react';
import { UserContext, CartContext } from '../../context/AppProvider';

type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    description: string;
};

type SidebarProductDetailsProps = {
    selectedProduct: Product;
    handleCloseSidebar: () => void;
};

export default function SidebarProductDetails({ selectedProduct, handleCloseSidebar }: SidebarProductDetailsProps) {
    const [quantity, setQuantity] = useState(1);
    const { user } = useContext(UserContext)!;
    const { addToCart } = useContext(CartContext)!;
    const totalPrice = (selectedProduct.price * quantity).toFixed(2);

    useEffect(() => {
        setQuantity(1);
    }, [selectedProduct]);

    

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleaddCart = () => {
        const product = {
            ...selectedProduct,
            quantity
        };

        if(!user){
            toast.error("Você precisa estar logado", {
                autoClose: 1500
            })
        }else{
            toast.success("Produto adicionado ao carrinho", {
                autoClose: 1500
            })
            addToCart(product);
        }
    };

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '120%' }}
            transition={{ type: 'spring', duration: 1.2 }}
            className="md:relative fixed w-full h-[45rem] md:h-auto md:w-[23%] p-4"
        >   
            <aside className="h-full w-full bg-mainly-200 rounded-2xl shadow-2xl shadow-gray-500 flex flex-col items-center">
                <ToastContainer className="absolute"/>
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-52 border-b-4 border-mainly-300 rounded-t-2xl" />
                <h2 className="pt-4 text-3xl font-sigmar text-base-400">{selectedProduct.name}</h2>
                <p className="text-md font-poppins font-semibold">({selectedProduct.category})</p>
                <div className="w-full flex flex-col justify-between h-full">
                    <div>
                        <p className="text-lg text-center mt-4 px-6 font-poppins font-medium text-mainly-400">
                            {selectedProduct.description}
                        </p>
                        <h1 className="font-sigmar text-support-100 border-y-2 text-center py-4 px-4 text-4xl border-mainly-300 mt-4">
                            R$ {totalPrice}
                        </h1>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-center mt-4">
                            <button
                                onClick={decreaseQuantity}
                                className="bg-mainly-300 text-mainly-200 font-bold px-4 py-2 rounded-l-lg hover:scale-95 transition-all duration-300"
                            >-</button>
                            <span className="mx-4 text-2xl font-bold">{quantity}</span>
                            <button
                                onClick={increaseQuantity}
                                className="bg-mainly-300 text-mainly-200 font-bold px-4 py-2 rounded-r-lg hover:scale-95 transition-all duration-300 "
                            >+</button>
                        </div>
                        <DefaultButton
                            text="Add Carrinho"
                            onClick={handleaddCart}
                        />
                        <button
                            onClick={handleCloseSidebar}
                            className="bg-mainly-300 rounded-lg text-2xl mx-6 py-2 text-mainly-200 font-bold mb-4 hover:scale-95 transition-all duration-300"
                        >
                                Voltar
                        </button>
                    </div> 
                </div>
            </aside>
        </motion.div>
    );
}
