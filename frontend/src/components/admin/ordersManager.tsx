import { useEffect, useState, useContext } from 'react';
import { api } from '../../api/axios';
import { UserContext } from '../../context/AppProvider';
import CardManagerOrder from '../cards/cardManagerOrder';

type Order = {
    id: number;
    totalPrice: number;
    status: string;
    user: {
        name: string;
        address: string;
    };
    items: {
        quantity: number;
        product: {
        name: string;
        price: number;
        };
    }[];
}

export default function OrdersManager() {

    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useContext(UserContext)!;

    useEffect(() => {
        const fetchOrders = async () => {
        try {
            const response = await api.post('/orders/allOrders', { adminId: user?.id });
            setOrders(response.data);
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        } finally {
        }
        };

        fetchOrders();
    }, []);

    const updateStatus = async (orderId: number, status: string) => {
        try {
        const response = await api.put(`orders/${orderId}`, { status, adminId: user?.id });
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: response.data.status } : order
            )
        );
        } catch (error) {
        console.error('Erro ao atualizar status:', error);
        }
    };

    return (
        <section className="w-full p-8">
            {
                orders.length === 0 ? (
                    <h1 className="text-2xl text-mainly-300 font-sigmar">Você ainda não tem pedidos hoje : (</h1>
                ) : (
                    <div className="flex flex-wrap gap-10">
                        {orders.map((order) => (
                            <CardManagerOrder
                                key={order.id}
                                order={order}
                                updateStatus={updateStatus}
                            />
                        ))}
                    </div>
                )
            }
            
        </section>
    );
}
