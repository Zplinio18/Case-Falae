import { Router, Request, Response } from 'express';
import { prisma } from "../database/prisma";
import Product from '../interfaces/products-interface';
import { verifyPermition } from '../middleware/verify-permition';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
})


// Essa rota foi criada para facilitar o preenchimento do cardapio para melhor visualização das funcionalidades do app
router.post('/bulk', async (req: Request, res: Response) => {
    const products: Product[] = req.body;

    const createdProducts = await prisma.$transaction(
        products.map(product => prisma.product.create({ data: product }))
    );

    return res.status(201).json(createdProducts);
});


router.post('/', verifyPermition, async (req: Request, res: Response) => {
    const { name, category, price, description, imageUrl } : Product = req.body as Product;

    const product = await prisma.product.create({
        data: {
            name,
            category,
            price,
            description,
            imageUrl
        }
    });

    return res.status(201).json(product);
})



router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id)
        }
    });

    return res.status(200).json(product);
})



router.put('/:id', verifyPermition, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, category, price, description, imageUrl } : Product = req.body as Product;

    const existingProduct = await prisma.product.findUnique({
        where: { id: parseInt(id) }
    });

    if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const product = await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
            name,
            category,
            price,
            description,
            imageUrl
        }
    });

    return res.status(200).json(product);
})



router.delete('/:id', verifyPermition, async (req: Request, res: Response) => {
    const { id } = req.params;

    const existingProduct = await prisma.product.findUnique({
        where: { id: parseInt(id) }
    });

    if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    
    await prisma.orderItem.deleteMany({
        where: { productId: parseInt(id) }
    });

    await prisma.product.delete({
        where: { id: parseInt(id) }
    });
    

    return res.status(204).send();
})

export default router;