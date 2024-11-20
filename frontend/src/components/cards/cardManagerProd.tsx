type CardManagerProd = {
    product: Product;
    handleEdit: (product: Product) => void;
    handleDelete: (id: number) => void;
}

type Product  = {
    id?: number;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
}


export default function CardManagerProd({product, handleEdit, handleDelete}: CardManagerProd) {
    return(
        <li key={product.id} className="slideLeft flex flex-col justify-between items-center bg-gray-950/20 backdrop-blur-sm shadow-sm shadow-mainly-300 backdrop-opacity-50 p-4 rounded">
            <div className='w-full'>
                <div className="flex justify-between">
                    <h3 className="font-bold font-poppins text-xl text-mainly-300">{product.name}</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => product && handleEdit(product)}
                            className="bg-mainly-300 text-white py-1 px-3 rounded hover:scale-95 duration-200"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => product.id && handleDelete(product.id)}
                            className="bg-support-200 text-white py-1 px-3 rounded hover:scale-95 duration-200"
                        >
                            Deletar
                        </button>
                    </div>
                </div>       
                <p className='font-semibold text-zinc-200'>Categoria: <span className="font-normal text-zinc-400">{product.category}</span></p>
                <p className='font-semibold text-zinc-200'>Preço: <span className="font-normal text-zinc-400">R$ {product.price.toFixed(2)}</span></p>
                <p className='font-semibold text-zinc-200'>Descrição: <span className="font-normal text-zinc-400">{product.description}</span></p>
                <img src={product.imageUrl} alt={product.name} className=" rounded-xl w-32 mt-2" />
            </div>        
        </li>
    )

        
}