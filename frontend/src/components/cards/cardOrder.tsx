import { FaHourglassHalf, FaCheckCircle } from 'react-icons/fa';
import { PiCookingPotFill } from "react-icons/pi";
import { RiMotorbikeFill } from "react-icons/ri";


type OrderStatus = 
  | "Aguardando confirmação"
  | "Em preparo"
  | "Em trânsito"
  | "Entregue";

type Order = {
  id: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  items: {
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
    };
  }[];
};

export default function CardOrder({ order }: { order: Order }) {

    const statusIcons: Record<OrderStatus, JSX.Element> = {
        "Aguardando confirmação": <FaHourglassHalf color="#FF9D00"  className='text-3xl'/>,
        "Em preparo": <PiCookingPotFill color="#FFD700"  className='text-3xl'/>,
        "Em trânsito":<RiMotorbikeFill color="#ADFF2F"  className='text-3xl'/>,
        "Entregue": <FaCheckCircle color="#6DC23E" className='text-3xl' />,
    };

    return (
        <div
        key={order.id}
        className="slide bg-white/50 backdrop-blur-sm backdrop-opacity-30 shadow-md rounded-lg p-6 flex flex-col duration-200 justify-between hover:scale-105 hover:shadow-lg"
        >
        <div>
            <h2 className="text-xl font-bold text-base-400 font-poppins">Pedido #{order.id}</h2>
            <p className="text-sm text-gray-500">
            Realizado em: {new Date(order.createdAt).toLocaleDateString('pt-BR')} às{" "}
            {new Date(order.createdAt).toLocaleTimeString('pt-BR')}
            </p>
        </div>
        <ul className="py-4">
            {order.items.map((item, index) => (
            <li key={index} className="flex flex-col ">
                <div className="flex justify-between items-center">
                <h3 className="font-medium text-base-400 flex-2">
                    {item.quantity}x {item.product.name}
                </h3>
                <p className="flex-1 bg-base-400 h-[1px] mx-4"></p>
                <p className="text-sm text-base-400 flex-2">
                    R$ {(item.product.price * item.quantity).toFixed(2)}
                </p>
                </div>
            </li>
            ))}
        </ul>
        <div>
            <p className="text-xl font-poppins font-semibold text-base-400">
            Total do pedido:{" "}
            <span className="text-support-100">R$ {order.totalPrice.toFixed(2)}</span>
            </p>
            <p
                className={`text-lg font-medium mt-8 flex items-center gap-2 ${
                    order.status === "Aguardando confirmação"
                    ? "text-[#FF9D00] border-[#FF9D00] border-l-4 pl-2"
                    : order.status === "Em preparo"
                    ? "text-[#FFD700] border-[#FFD700] border-l-4 pl-2" 
                    : order.status === "Em trânsito"
                    ? "text-[#ADFF2F] border-[#ADFF2F] border-l-4 pl-2" 
                    : order.status === "Entregue"
                    ? "text-[#6DC23E] border-[#6DC23E] border-l-4 pl-2" 
                    : ""
                }`}
            >
                {statusIcons[order.status]}
                {order.status}
            </p>
        </div>
        </div>
    );
}
