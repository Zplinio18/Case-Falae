import Nav from "../components/nav";
import background from "../assets/images/background.png";
import { FaShoppingCart } from "react-icons/fa";
import CardResume from "../components/cards/cardResume";
import { CartContext } from '../context/AppProvider';
import { useContext, useEffect } from "react";
import SidebarResume from "../components/sidebars/sidebarResume";
import { BsCartXFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function Carrinho() {

    const { cartItems } = useContext(CartContext)!;
    const navigate = useNavigate();

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    return (
        <main
            className="flex transition-all duration-500 bg-base-100 min-h-screen md:h-screen md:overflow-hidden"
            style={{ backgroundImage: `url(${background})` }}
        >
            <Nav 
                page = "Carrinho"
            />
            {
                cartItems.length === 0 ? (
                    <div className=" surge items-center flex flex-col text-8xl gap-8 py-9 text-base-400/50 h-screen w-full justify-center">
                        <BsCartXFill />
                        <p className="text-center text-base-400/50 text-4xl font-sigmar">
                            Seu carrinho está vazio! 
                        </p>
                        <button className="w-64 text-xl rounded-lg font-bold py-2 bg-mainly-200 hover:scale-95 duration-300" onClick={()=>{navigate("/")}}>
                            Voltar para o cardápio
                        </button>
                    </div>
                ) : (
                <section className="pt-16 md:h-screen w-full flex md:flex-row flex-col">
                    <div className="w-full md:w-[75%] flex flex-col">
                        <h1 className="text-4xl md:text-start w-full md:pl-10 py-8 text-base-400 font-sigmar flex gap-2 pb-4 justify-center md:justify-start">
                            Carrinho
                            <FaShoppingCart />
                        </h1>
                        <article className="overflow-y-auto invisible-scrollbar">
                            {cartItems.map((item, index) => (
                                <CardResume
                                    key={index}
                                    id={item.id}
                                    name={item.name}
                                    category={item.category}
                                    price={item.price}
                                    description={item.description}
                                    imageUrl={item.imageUrl}
                                    quantity={item.quantity}
                                />
                            ))}
                        </article>
                    </div>
                    <SidebarResume/>
                </section>
            )}
        </main>
    );
}