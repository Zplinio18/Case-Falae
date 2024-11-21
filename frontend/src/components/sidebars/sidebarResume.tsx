import { CartContext, UserContext } from "../../context/AppProvider"
import { useContext,useState } from "react";
import { api } from "../../api/axios";
import AlertLoading from "../alerts/AlertLoading";
import SuccessPopup from "../popups/successPopup";


export default function sidebarResume() {

    const { getTotalPrice, cartItems, clearCart} = useContext(CartContext)!;
    const { user } = useContext(UserContext)!;
    const [isLoading, setIsLoading] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);

    const handleOrder = () => {
        setIsLoading(true);

        const orderItems = cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        console.log(orderItems);


        api.post('/orders/', {
            userId: user?.id,
            products: orderItems
        })
        .then((response) => {
            console.log(response.data);
        }).catch(() => {
            console.log('Erro ao finalizar compra');
        }).finally(() => {
            setIsLoading(false); 
            setSuccessPopup(true);        
            setTimeout(() => {
                clearCart();
                setSuccessPopup(false);
            }, 4000);
            
        });
    }

    return (
        <article className="slideLeft md:h-screen md:w-[25%] w-full md:border-l-2 border-base-300 flex justify-between flex-col md:gap-0 gap-8">
            {
                isLoading && <AlertLoading />
            }
            {
                successPopup && <SuccessPopup />
            }
            <div>
                <h1 className="text-4xl pt-8 px-5 font-poppins font-semibold text-center w-full">
                    Total:  
                    <span className="font-normal font-sigmar text-support-100"> R${getTotalPrice()}</span>
                </h1>
                <div className="border-y-2 mt-10 mx-10 rounded-xl py-2 border-mainly-300 bg-mainly-200/20">
                    <h2 className="font-poppins font-bold text-base-400 text-xl text-center">Nome: <span className="font-normal ">{user?.name}</span></h2>
                    <h2 className="font-poppins font-bold text-base-400 text-xl text-center">Endereço: <span className="font-normal ">{user?.address}</span></h2>
                </div>
                
                
            </div>
            
            <div className="flex flex-col items-center">
                <button className="md:mb-24 mb-8 bg-mainly-200 py-3 mx-6 rounded-lg px-2 text-mainly-300 font-sigmar text-3xl hover:scale-105 duration-300" onClick={handleOrder}>
                    Finalizar compra
                </button>
            </div>
            
        </article>
    )
}