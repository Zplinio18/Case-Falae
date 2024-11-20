type CardProductsProps = {
    title: string;
    price: number;
    img: string;
    onClick: () => void;
}

export default function CardProducts({ title, price, img, onClick } : CardProductsProps) {
    return (
        <article onClick={onClick} className="surge bg-base-200/50 backdrop-blur-sm backdrop-opacity-30 rounded-lg p-4 shadow-xl cursor-pointer hover:scale-105 transition-all duration-300">
            <img src={img} alt={title} className="w-full h-48 object-cover rounded-lg" />
            <h1 className="text-2xl font-poppins pt-4 font-bold">{title}</h1>
            <p className="pt-2 text-2xl font-sigmar text-support-100">R$ {price.toFixed(2)}</p>
        </article>
    )
}