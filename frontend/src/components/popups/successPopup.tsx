import { FaCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessPopup() {

    const [countdown, setCountdown] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        if (countdown === 0) {
            navigate('/pedidos');
        }
        const intervalId = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [countdown, navigate]);

    return(
        <div
            className="fadeIn fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-slate-800/20 z-[1000] overflow-hidden">
            <article className="surge px-8 bg-base-200 rounded-xl flex py-8 text-support-100 flex-col items-center gap-4 text-xl border-2 font-poppins border-support-100 justify-center">
                <FaCircleCheck className="text-6xl "/>
                <h1 className="text-center font-bold">Pedido Realizado!
                    <p className="text-lg font-normal pt-2 text-base-300">Indo para pedidos em...</p>
                </h1>
                <p className="text-6xl">{countdown}</p>
            </article>
        </div>
    )
}