import { Router, Request, Response } from 'express';
import { prisma } from "../database/prisma";
import Order from '../interfaces/orders-interface';
import Status from '../interfaces/orders-interface';
import { verifyPermition } from '../middleware/verify-permition';


const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
        include: { items: true }
    });

    return res.status(200).json(orders);
})

  
router.post('/', async (req: Request, res: Response) => {
    const { userId, products }: Order = req.body as Order;
    let totalPrice : number = 0;

    if (!products || products.length === 0) {
        return res.status(400).json({ error: 'Nenhum produto foi enviado no pedido.' });
    }
  
    const orderItems = await Promise.all(products.map(async (product) => {
        const productData = await prisma.product.findUnique({
            where: { id: product.productId }
        });

        if (!productData) {
            throw new Error(`Produto com ID ${product.productId} não encontrado.`);
        }

        totalPrice += productData.price * product.quantity;

        return {
            productId: product.productId,
            quantity: product.quantity,
        };
    }));

    const order = await prisma.order.create({
        data: {
            totalPrice,
            status: 'Aguardando confirmação',
            items: {
                create: orderItems
            },
            userId: userId
        }
    });

    return res.status(201).json(order);
})


router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const orderexists = await prisma.order.findUnique({
        where: { id: parseInt(id) }
    });

    if (!orderexists) {
        return res.status(404).json({ message: 'Order not found' });
    }

    const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
        include: {
            items: {
                select: {
                    quantity: true,
                    product: {
                        select: {
                            name: true,
                            price: true
                        }
                    }
                }
            }
        }
    });

    return res.status(200).json(order);
})

router.put('/:id', verifyPermition, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } : Status = req.body as Status;

    if (!status) {
        return res.status(400).json({ error: 'Status is required.' });
    }

    try {
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status }
        });

        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(404).json({ error: 'Order not found.' });
    }
});



export default router;