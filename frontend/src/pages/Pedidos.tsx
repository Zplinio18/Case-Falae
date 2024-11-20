import { useCallback, useEffect, useState, useContext } from 'react';
import { api } from '../api/axios';
import { UserContext } from '../context/AppProvider';
import Nav from '../components/nav';
import background from '../assets/images/background.png';
import { FaStickyNote } from "react-icons/fa";
import { IoLeaf } from "react-icons/io5";
import CardOrder from '../components/cards/cardOrder';

export default function Pedidos() {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(UserContext)!;

    const fetchOrders = useCallback(() => {
        api.get(`/orders/user/${user?.id}`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error('Erro ao buscar pedidos:', error);
            });
    }, [user]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <main
            className="flex transition-all duration-500 bg-base-100 md:h-screen md:overflow-hidden"
            style={{ backgroundImage: `url(${background})` }}
        >
            <Nav page="Pedidos" />
            {
                orders.length === 0 ? (
                    <div className="surge items-center flex flex-col text-8xl gap-8 py-9 text-base-400/50 h-screen w-full justify-center">
                        <IoLeaf />
                        <p className="text-center text-base-400/50 text-4xl font-sigmar">
                            Sem pedidos por aqui...
                        </p>
                    </div>
                ) : (
                     <section className="pt-20 flex-1 flex">
                        <div className="flex flex-col w-full md:h-screen pb-7">
                            <h1 className="text-4xl md:text-start w-full md:pl-10 pt-4 text-base-400 font-sigmar pb-2 flex gap-2 justify-center md:justify-normal">
                                Meus Pedidos
                                <FaStickyNote />
                            </h1>
                            <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
                                {[...orders].reverse().map((order: any) => (
                                    <CardOrder
                                        key={order.id}
                                        order={order}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                    )
            }
           
        </main>
    );
}
