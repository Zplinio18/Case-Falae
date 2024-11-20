import { useState, useEffect, ChangeEvent, useCallback, useContext } from 'react';
import { api } from '../../api/axios';
import CardManagerProd from '../cards/cardManagerProd';
import ProductForm from '../productForm';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../../context/AppProvider';

type Product = {
    id?: number;
    name: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
};

export default function ProductsManager() {

    const [products, setProducts] = useState<Product[]>([]);
    const [formData, setFormData] = useState<Product>({name: '', category: '', price: 0, description: '', imageUrl: '',});
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { user } = useContext(UserContext)!;

    const fetchProducts = useCallback(() => {
        api.get('/products')
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    };

    const handleSubmit = () => {
        const { name, category, price, description, imageUrl } = formData;
        const requiredFields = { name, category, price, description, imageUrl };

        const hasEmptyFields = Object.entries(requiredFields).some(([key, value]) => {
            if (typeof value === 'string' && !value.trim()) {
                return true;
            }
            return false;
        });

        if (hasEmptyFields) {
            toast.error("Preencha todos os campos", {
                autoClose: 1500
            });
        }else{
            if (isEditing && formData.id) {
                api.put(`/products/${formData.id}`, {...formData, adminId: user?.id}).then(() => {   
                    fetchProducts();
                    setFormData({ name: '', category: '', price: 0, description: '', imageUrl: '' });
                    setIsEditing(false);;
                });
            } else {
                api.post('/products/', {...formData, adminId: user?.id}).then(() => {
                    fetchProducts();
                    setFormData({ name: '', category: '', price: 0, description: '', imageUrl: '' });
                });
            }
        }
        
    };

    const handleEdit = (product: Product) => {
        setFormData(product);
        setIsEditing(true);
    };

    const handleDelete = async (id: number) => {

        api.delete(`/products/${id}`, { data: { adminId: user?.id } })
        .then(() =>{
            fetchProducts();
        }).catch(() => {
            toast.error("Algo esta errado...", {
                autoClose: 1500
            })
        })
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className="p-8 flex flex-col md:flex-row justify-between gap-8 md:overflow-hidden overflow-auto">
        <ToastContainer className="absolute"/>
        <ProductForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isEditing={isEditing}
        />
        <ul className="md:overflow-y-auto invisible-scrollbar flex-1 gap-4 flex flex-col py-4">
            {products.map((product) => (
            <CardManagerProd
                key={product.id}
                product={product}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            ))}
        </ul>
        </div>
    );
}
