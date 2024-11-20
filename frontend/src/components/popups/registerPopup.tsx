import { motion } from 'framer-motion';
import { useState, useContext } from 'react';
import InputMask from 'react-input-mask';
import DefaultButton from '../buttons/defaultButton';
import { api } from '../../api/axios';
import { UserContext } from '../../context/AppProvider';
import { useNavigate } from 'react-router-dom';
import AlertLoading from '../alerts/AlertLoading';

export default function RegisterPopup({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '', phone: '' });
    const [errors, setErrors] = useState({ email: '', phone: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const { addUser } = useContext(UserContext)!;
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorMessage(false);
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'email') {
            validateEmail(value);
        }
        if (name === 'phone') {
            validatePhone(value);
        }
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prev) => ({
            ...prev,
            email: emailRegex.test(email) ? '' : 'Formato de e-mail inválido',
        }));
    };

    const validatePhone = (phone: string) => {
        const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
        setErrors((prev) => ({
            ...prev,
            phone: phoneRegex.test(phone) ? '' : 'Formato de telefone inválido',
        }));
    };

    const handleRegister = () => {
        const { name, email, password, address } = formData;
        const requiredFields = { name, email, password, address };

        const hasEmptyFields = Object.entries(requiredFields).some(([key, value]) => {
            if (!value.trim()) {
                return true;
            }
            return false;
        });
    
        if (hasEmptyFields || errors.email) {
            setErrorMessage(true);
        } else {
            setIsLoading(true);

            api.post('auth/register', {
                name: formData.name,
                password: formData.password,
                email: formData.email,
                address: formData.address,
                phone: formData.phone
            }).then((response) => {
                console.log(response.data);
                const user  = response.data;
                console.log(user);
                addUser(user);
                onClose();
                setTimeout(() => {
                    navigate("/")
                },2500)
            }).catch(() => {
                setErrorMessage(true);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    };


    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', duration: 1.2 }}
            className="absolute flex justify-center items-center w-full h-screen z-[100] backdrop-blur-sm"
        >
            {
                isLoading && (
                    <AlertLoading/>
                )
            }
            <div className="form w-[26rem] rounded-xl shadow-xl overflow-hidden snap-start shrink-0 pb-5 bg-mainly-200 h-auto flex flex-col items-center justify-center gap-3 transition-all duration-300">
                <div className="capitalize w-full px-8 gap-4 h-full flex flex-col justify-between">
                    <p className="text-3xl text-mainly-300 font-sigmar text-center pt-4">Registre-se</p>
                    {errorMessage && <p className="w-full bg-red-600/50 text-center rounded-md py-1 text-base-100 border-red-700 border-2 fadeIn">Preencha os campos obrigatórios corretamente</p>}
                    <form className="flex flex-col gap-5">
                        <div className="flex flex-col items-start w-full">
                            <label className="text-lg font-poppins text-mainly-400 font-semibold">Nome *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Entre com seu nome"
                                className="w-full py-px pt-2 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-mainly-400 placeholder:text-mainly-300 focus:outline-none text-mainly-400 placeholder:text-sm"
                            />
                        </div>

                        <div className="flex flex-col items-start w-full">
                            <label className="text-lg font-poppins text-mainly-400 font-semibold">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Entre com seu email"
                                className="w-full py-px pt-2 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-mainly-400 placeholder:text-mainly-300 focus:outline-none text-mainly-400 placeholder:text-sm"
                            />
                            {errors.email && <span className="text-red-500 text-sm animate-pulse">{errors.email}</span>}
                        </div>

                        <div className="flex flex-col items-start w-full">
                            <label className="text-lg font-poppins text-mainly-400 font-semibold">Senha *</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Entre com sua senha"
                                className="w-full py-px pt-2 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-mainly-400 placeholder:text-mainly-300 focus:outline-none text-mainly-400 placeholder:text-sm"
                            />
                        </div>

                        <div className="flex flex-col items-start w-full">
                            <label className="text-lg font-poppins text-mainly-400 font-semibold">Endereço *</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Entre com seu endereço"
                                className="w-full py-px pt-2 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-mainly-400 placeholder:text-mainly-300 focus:outline-none text-mainly-400 placeholder:text-sm"
                            />
                        </div>

                        <div className="flex flex-col items-start w-full">
                            <label className="text-lg font-poppins text-mainly-400 font-semibold">Telefone</label>
                            <InputMask
                                mask="(99)99999-9999"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Entre com seu telefone"
                                className="w-full py-px pt-2 pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-mainly-400 placeholder:text-mainly-300 focus:outline-none text-mainly-400 placeholder:text-sm"
                            />
                            {errors.phone && <span className="text-red-500 text-sm animate-pulse">{errors.phone}</span>}
                        </div>
                    </form>
                    <div className="inline-flex gap-5 justify-center pt-6">
                        <button className="bg-mainly-300 rounded-lg font-sigmar text-2xl px-2 py-2 text-mainly-200 hover:scale-95 transition-all duration-300" onClick={onClose}>
                            Voltar
                        </button>
                        <DefaultButton 
                            text="Registrar"
                            onClick={handleRegister}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}