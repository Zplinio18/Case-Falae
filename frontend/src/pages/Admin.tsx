import Nav from "../components/nav"
import background from "../assets/images/background.png"
import { useState, useContext, useEffect } from "react"
import OrdersManager from "../components/admin/ordersManager"
import ProductsManager from "../components/admin/productsManager"
import { UserContext } from "../context/AppProvider"
import { useNavigate } from "react-router-dom"

export default function Admin() {

    const [isProductsOpen, setIsProductsOpen] = useState(false)
    const [isOrdersOpen, setIsOrdersOpen] = useState(true)
    const { user } = useContext(UserContext)!;
    const navigate = useNavigate()


    const handleOpenOrders = () => {
        setIsOrdersOpen(true)
        setIsProductsOpen(false)
    }

    const handleProductsOpen = () => {
        setIsProductsOpen(true)
        setIsOrdersOpen(false)
    }

    useEffect(() => {
        if (!user?.isAdmin) {
            navigate('/erro')
        }
    })

    return (
        <main
            className="flex transition-all duration-500 bg-zinc-800 h-screen overflow-hidden"
            style={{ backgroundImage: `url(${background})` }} 
        >
            <Nav
                page="Admin"
            />
            <section className="pt-20 flex w-full">
                <div className="flex flex-col w-full">
                    <h1 className="text-4xl w-full text-center pt-4 text-mainly-300 font-sigmar pb-2 flex gap-2 justify-center">
                        Administrar
                    </h1>
                    <div className="flex w-full justify-center gap-8 pt-6 pb-4">
                        <button 
                        className={`font-poppins ${isOrdersOpen ? 'text-slate-800 bg-mainly-300' : 'text-mainly-300 bg-transparent' } font-bold rounded-xl border-2 border-mainly-300 duration-300 hover:bg-mainly-300  hover:text-slate-800 py-2 px-6`}
                        onClick={handleOpenOrders}
                        >
                            Pedidos
                        </button>
                        <button 
                        className={`font-poppins ${isProductsOpen ? 'text-slate-800 bg-mainly-300' : 'text-mainly-300 bg-transparent' } font-bold rounded-xl border-2 border-mainly-300 duration-300 hover:bg-mainly-300  hover:text-slate-800 py-2 px-6`}
                        onClick={handleProductsOpen}
                        >
                            Produtos
                        </button>
                    </div>
                    {
                        isOrdersOpen ? (
                            <OrdersManager/>
                        ) : (
                            <ProductsManager/>
                        )
                    }
                    
                </div>
            </section>
            
        </main>
    )
}