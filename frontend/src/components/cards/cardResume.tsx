import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/AppProvider";

type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
    quantity: number;
};

export default function CardResume({id, name, category, price, description, imageUrl, quantity,}: Product) {

    const [actualQuantity, setActualQuantity] = useState(quantity);
    const { addToCart, removeFromCart } = useContext(CartContext)!;

    const updateCartQuantity = (newQuantity: number) => {
        const updatedProduct = {id, name, category, price, description, imageUrl, quantity: newQuantity,};
        addToCart(updatedProduct);
    };

    const increaseQuantity = () => {
        const newQuantity = actualQuantity + 1;
        setActualQuantity(newQuantity);
        updateCartQuantity(newQuantity);
    };

    const decreaseQuantity = () => {
        if (actualQuantity > 1) {
            const newQuantity = actualQuantity - 1;
            setActualQuantity(newQuantity);
            updateCartQuantity(newQuantity);
        } else {
            removeFromCart(name);
        }
    };

    useEffect(() => {
        setActualQuantity(quantity);
    }, [quantity]);

    return (
        <div className="slide border-y-2 border-base-300 flex md:flex-row flex-col justify-between mb-4 bg-base-200/30 backdrop-blur-sm backdrop-opacity-30">
            <div className="flex">
                <img src={imageUrl} alt="" className="w-40 rounded-e-xl hidden md:block" />
                <div className="flex flex-col gap-4 px-4 pb-8 pt-3">
                    <h2 className="text-2xl font-bold font-poppins flex items-center gap-3">
                        {name} <p className="text-sm font-normal">({category})</p>
                    </h2>
                    <p className="text-base-300 font-poppins ">{description}</p>
                </div>
            </div>
            <div className="flex flex-col justify-between items-center md:gap-0 gap-4">
                <div className="flex items-center gap-2 mt-4  bg-base-200">
                    <button
                        onClick={decreaseQuantity}
                        className="font-bold px-2 text-2xl text-support-200 hover:bg-support-200 hover:text-white transition-all duration-300"
                    >
                        -
                    </button>
                    <span className="text-xl font-semibold ">{actualQuantity}</span>
                    <button
                        onClick={increaseQuantity}
                        className="font-bold px-2 text-2xl text-support-100 hover:bg-support-100 hover:text-white transition-all duration-300"
                    >
                        +
                    </button>
                </div>
                <p className="text-2xl font-bold font-poppins text-support-100 px-2">R$ {(price * actualQuantity).toFixed(2)}</p>
            </div>
        </div>
    );
}
