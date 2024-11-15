import React, { useContext, useState } from 'react';
import DefaultButton from './buttons/defaultButton';
import { api } from '../api/axios';
import { UserContext } from '../context/AppProvider';
import { useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';

interface LoginPopupProps {
  onClose: () => void;
}


export default function LoginPopup ({ onClose } : LoginPopupProps) {


    const [formData, setFormData] = useState({ email: '', password: '' });
    // const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const { addUser } = useContext(UserContext)!;
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setErrorMessage(false);
        setFormData((prev) => ({ 
            ...prev, [name]: value 
        }));
    };

    const handleSubmit = () => {
        // setIsLoading(true);

        api.post('auth/login', {
            email: formData.email,
            password: formData.password
        }).then((response) => {
            console.log(response.data);
            const user  = response.data;
            console.log(user);
            addUser(user);
            onClose();
            alert("Login efetuado com sucesso!");
            setTimeout(() => {
                navigate("/")
            },2500)
        }).catch(() => {
            setErrorMessage(true);
        }).finally(() => {
            // setIsLoading(false);
        });

            
    };

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', duration: 1.2 }} 
            className="absolute flex justify-center items-center w-full h-screen z-[100] backdrop-blur-sm"
        >
        <div className="form w-96 rounded-xl shadow-xl overflow-hidden snap-start shrink-0 pb-5 bg-mainly-200 h-96 flex flex-col items-center justify-center gap-3 transition-all duration-300">
            <div className="capitalize w-full px-8 gap-4 h-full flex flex-col justify-between">
            <p className="text-3xl text-mainly-300 font-sigmar text-center pt-4">Entrar na conta</p>
            {errorMessage && <p className="w-full bg-red-600/50 text-center rounded-md py-1 text-base-100 border-red-700 border-2 fadeIn">Email ou senha incorretos</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col items-start w-full">
                <label htmlFor="email" className="text-lg font-poppins text-mainly-400 font-semibold">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Entre com seu email"
                    className="w-full py-px pt-2 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-mainly-400 placeholder:text-mainly-300 focus:outline-none text-mainly-400 placeholder:text-sm"
                />
                </div>

                <div className="flex flex-col items-start w-full">
                <label htmlFor="password" className="text-lg font-poppins text-mainly-400 font-semibold">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Entre com sua senha"
                    className="w-full py-px pt-2 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-mainly-400 placeholder:text-mainly-300 focus:outline-none text-mainly-400 placeholder:text-sm"
                />
                </div>
            </form>
            <div className="">
                <p className="text-mainly-400">
                Não tem uma conta?{' '}
                <button
                    type="button"
                    className="text-mainly-300 underline hover:text-base-100 transition-all duration-300"
                >
                    Registre-se
                </button>
                </p>
            </div>
            <div className="inline-flex gap-5 justify-center">
                <button
                onClick={onClose}
                className="bg-mainly-300 rounded-lg font-sigmar text-2xl px-2 py-2 text-mainly-200 hover:scale-95 transition-all duration-300"
                >
                Voltar
                </button>
                <DefaultButton
                    text="Entrar"
                    onClick={handleSubmit}
                />
            </div>
            </div>
        </div>
        </motion.div>
    );
};