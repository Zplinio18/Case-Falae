import { FaRegSadTear } from "react-icons/fa";
import background from '../assets/images/background.png';



export default function NotFound() {
    return (
        <section className="bg-center bg-cover flex items-center flex-col justify-center w-full h-screen bg-base-100" style={{ backgroundImage: `url(${background})` }}>
            <FaRegSadTear className="text-9xl text-mainly-300 mb-12"/>
            <h1 className="text-5xl  text-mainly-300 mb-2 font-sigmar">404</h1>
            <h2 className="text-2xl text-mainly-300 mb-4">Página não encontrada</h2>
            <a href="/" className="bg-mainly-300 px-4 py-1 rounded-lg text-2xl text-base-100 font-sigmar hover:bg-transparent hover:text-mainly-300 duration-200">Voltar</a>
        </section>
    );
}