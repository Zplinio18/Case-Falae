import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext, CartContext } from '../../context/AppProvider';


export default function ProfileSideBar() {

    const navigate = useNavigate();
    const { removeUser, user } = useContext(UserContext)!;
    const { clearCart } = useContext(CartContext)!;

    const handleLogout = () => {
        removeUser()
        clearCart()
        navigate("/")
    }

    return (
        <motion.div
            initial={{ top:58 , opacity: 0 }}
            animate={{ top: 64, opacity: 1 }}
            transition={{ duration: 0.5 }}
             className="absolute top-16 md:w-52 w-full bg-mainly-200 rounded-b-xl py-2 md:right-1 right-0">
            <div className="flex flex-col">
                <button className="hover:text-mainly-300 text-start duration-300 border-y-2 border-mainly-300 p-2" onClick={() =>{navigate("/")}}>Cardápio</button>
                <button className="hover:text-mainly-300 text-start duration-300 border-b-2 border-mainly-300 p-2" onClick={() =>{navigate("/pedidos")}}>Meus Pedidos</button>
                {
                    user?.isAdmin && (
                        <button className="hover:text-mainly-300 text-start duration-300 border-b-2 border-mainly-300 p-2" onClick={() =>{navigate("/admin")}}>Adm Restaurante</button>
                    )
                }
                <button className="hover:text-mainly-300 text-start duration-300 border-b-2 border-mainly-300 p-2" onClick={handleLogout}>Sair</button>
            </div>
        </motion.div>
    )
}