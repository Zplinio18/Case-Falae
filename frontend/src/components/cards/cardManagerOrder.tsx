type CardManagerOrderProps = {
    order: Order;
    updateStatus: (orderId: number, status: string) => void;
};

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

export default function CardManagerOrder({ order, updateStatus }: CardManagerOrderProps) {

    return (
        <article
            key={order.id}
            className="surge w-96 bg-gray-950/20 backdrop-blur-sm shadow-sm shadow-mainly-300 rounded-lg p-6 flex flex-col duration-200 justify-between"
        >
            <div>
                <div>
                    <h2 className="text-xl font-bold text-mainly-300 font-poppins pb-4">Pedido #{order.id}</h2>
                </div>
                <p className="text-sm text-zinc-400">
                <strong>Cliente:</strong> {order.user.name}
                </p>
                <p className="text-sm text-zinc-400">
                <strong>Endereço:</strong> {order.user.address}
                </p>
            </div>
                                
            <ul className="py-4">
                {order.items.map((item, index) => (
                    <li key={index} className="flex flex-col ">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-mainly-400 flex-2">
                                {item.quantity}x {item.product.name}
                            </h3>
                            <p className="flex-1 bg-mainly-300 text-mainly-400 h-[1px] mx-4"></p>
                            <p className="text-sm text-mainly-400 flex-2">
                                R$ {(item.product.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
                                
            <div>
                <p className="text-xl font-poppins font-semibold text-zinc-400 mb-4">
                    Total do pedido:{" "}
                    <span className="text-zinc-500">R$ {order.totalPrice.toFixed(2)}</span>
                </p>
                <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="border p-2 rounded bg-gray-950/20 backdrop-blur-sm shadow-sm border-mainly-300 text-zinc-400 w-full cursor-pointer"
                >
                    <option value="Aguardando confirmação">Aguardando confirmação</option>
                    <option value="Em preparo">Em preparo</option>
                    <option value="Em trânsito">Em trânsito</option>
                    <option value="Entregue">Entregue</option>
                </select>
            </div>
                                
        </article>
    )
}