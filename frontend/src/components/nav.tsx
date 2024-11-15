import Logo from '../assets/images/logo.png';
import { useContext,useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import DefaultButton from './buttons/defaultButton';
import LoginPopup from './loginPopup';
import { AnimatePresence } from 'framer-motion';
import { UserContext } from '../context/AppProvider';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const { user } = useContext(UserContext)!;

  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-[99] animationDown">
        <AnimatePresence>
            {
                logOpen && 
                    <LoginPopup
                        onClose={() => setLogOpen(false)}
                    /> 
            }
        </AnimatePresence>
        <div className="md:flex items-center justify-between bg-mainly-200 py-2 md:px-10 px-7">
            <div className="flex gap-4 items-center text-4xl font-sigmar text-mainly-300">
            <img src={Logo} alt="Logo" className="h-12" />
            <h1>Come Aê</h1>
            </div>
            <div className="text-3xl flex items-center gap-3 hover:text-4xl text-neutral-100 absolute right-8 top-6 cursor-pointer md:hidden transition-all duration-500">
                <FaShoppingCart
                    className={`text-base-100 text-2xl cursor-pointer hover:text-mainly-300 duration-300 ${open ? 'hidden' : 'block'}`}
                />
                <div onClick={() => setOpen(!open)}>
                    {open ? <IoClose /> : <IoMenu/>}
                </div>
            </div>
            <ul
            className={`md:flex md:items-center md:gap-2 bg-mainly-200 md:pb-0 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
                open ? 'top-14 opacity-100' : 'top-[-490px]'
            } md:opacity-100 opacity-0`}
            >
            
            {
                user ? (
                    <div className="flex gap-8 font-poppins">
                        <h1 className="font-semibold">Olá, {user.name}!</h1>
                        <a href="/carrinho">
                            <FaShoppingCart
                                className={`text-base-100 text-2xl cursor-pointer hover:text-mainly-300 duration-500 md:block hidden ${open ? 'opacity-0' : 'opacity-100'}`}
                            />
                        </a>
                        
                    </div>
                ) : (
                    <li className=" md:mb-0 mb-4 md:my-0 my-7">
                        <DefaultButton
                            text="Entrar"
                            onClick={() => setLogOpen(true)}
                        />
                    </li>
                )
            }
            
            
            </ul>
        </div>
    </nav>
  );
}
