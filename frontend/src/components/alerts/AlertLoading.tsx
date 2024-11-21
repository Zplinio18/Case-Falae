import { VscLoading } from "react-icons/vsc";
import { motion } from "framer-motion";

export default function AlertLoading() {

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', duration: 1 }}  
            className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-slate-800/20 z-[1000]">
            <article className="w-56 bg-base-200 rounded-xl flex py-8 text-mainly-300 flex-col items-center gap-10 text-xl"
        >
                <VscLoading className="text-7xl rotate"/>
                <h1>Carregando...</h1>
            </article>
        </motion.div>
    )
}