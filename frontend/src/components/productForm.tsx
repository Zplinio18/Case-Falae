import  { ChangeEvent } from 'react';

type Product = {
    id?: number;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
};

type ProductFormProps = {
    formData: Product;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: () => void;
    isEditing: boolean;
    isLoading: boolean;
};

export default function ProductForm ({formData,handleInputChange,handleSubmit,isEditing, isLoading} : ProductFormProps) {
    return (
        <form onSubmit={handleSubmit} className="slide flex flex-col gap-6 md:flex-1 flex-2 border border-mainly-300 rounded-xl px-4 justify-between bg-gray-950/20 backdrop-blur-sm shadow-sm">
            <h1 className="text-center font-poppins font-bold text-2xl text-mainly-300 pt-2">Criar ou Editar Produto</h1>
            <div className='flex flex-col gap-6'>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nome do Produto"
                    className="border p-2 rounded bg-gray-950/20 backdrop-blur-sm shadow-sm border-mainly-300 placeholder:text-zinc-400 text-zinc-300"
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="border p-2 rounded bg-gray-950/20 backdrop-blur-sm shadow-sm border-mainly-300 text-zinc-400"
                >
                    <option value="" disabled>
                    Selecione uma Categoria
                    </option>
                    <option value="Entrada">Entrada</option>
                    <option value="Prato Principal">Prato Principal</option>
                    <option value="Sobremesa">Sobremesa</option>
                    <option value="Bebida">Bebida</option>
                </select>
                <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleInputChange}
                    placeholder="Preço (0.00)"
                    className="border p-2 rounded bg-gray-950/20 backdrop-blur-sm shadow-sm border-mainly-300 placeholder:text-zinc-400 text-zinc-300"
                />
                <input
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Descrição"
                    className="border p-2 rounded bg-gray-950/20 backdrop-blur-sm shadow-sm border-mainly-300 placeholder:text-zinc-400 text-zinc-300"
                />
                <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="URL da Imagem"
                    className="border p-2 rounded bg-gray-950/20 backdrop-blur-sm shadow-sm border-mainly-300 placeholder:text-zinc-400 text-zinc-300"
                />
            </div>
            <button
                type="submit"
                className={` ${isLoading ? 'bg-zinc-400 hover:scale-100 ': 'bg-mainly-300' } text-gray-950/65 placeholder:text-zinc-400 font-sigmar text-2xl py-2 px-4 rounded hover:scale-95 duration-300 mb-8`}
                disabled={isLoading}
            >
                {isLoading ? 'Carregando...' : isEditing ? 'Atualizar Produto' : 'Criar Produto'}
            </button>
        </form>
    );
};
