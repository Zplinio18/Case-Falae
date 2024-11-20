import { motion } from 'framer-motion';
import { useState } from 'react';
import DefaultButton from '../buttons/defaultButton';

export default function RegisterPopup() {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ 
            ...prev, [name]: value 
        }));
    };

    return(
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
            <form className="flex flex-col gap-5">
                <div className="flex flex-col items-start w-full">
                <label className="text-lg font-poppins text-mainly-400 font-semibold">
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
                <label className="text-lg font-poppins text-mainly-400 font-semibold">
                    Senha
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
                    className="bg-mainly-300 rounded-lg font-sigmar text-2xl px-2 py-2 text-mainly-200 hover:scale-95 transition-all duration-300"
                    >
                    Voltar
                    </button>
                    <DefaultButton
                        text="Entrar"
                    />
                </div>
                </div>
            </div>
        </motion.div>
    )
}