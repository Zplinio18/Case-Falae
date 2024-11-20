import { Router, Request, Response } from 'express';
import { prisma } from "../database/prisma";
import Order from '../interfaces/orders-interface';
import Status from '../interfaces/orders-interface';
import { verifyPermition } from '../middleware/verify-permition';


const router = Router();


router.post('/allOrders', verifyPermition, async (req: Request, res: Response) => {
    const orders = await prisma.order.findMany({
      where: {
        status: {
          not: 'Entregue',
        },
      },
      include: {
        user: {
          select: {
            name: true,
            address: true,
          },
        },
        items: {
          select: {
            quantity: true,
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
    });
  
    return res.status(200).json(orders);
  });
  
      
  

  
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

router.get('/user/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;

    const orders = await prisma.order.findMany({
        where: { userId },
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

    if (orders.length === 0) {
        return res.status(404).json({ message: 'Nenhum pedido encontrado' });
    }

    return res.status(200).json(orders);
});


router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    const orderexists = await prisma.order.findUnique({
        where: { id: parseInt(id) }
    });

    if (!orderexists) {
        return res.status(404).json({ message: 'Pedido nao encontrado' });
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
        return res.status(400).json({ error: 'Status eh necessario' });
    }

    const orderexists = await prisma.order.findUnique({
        where: { id: parseInt(id) }
    });

    if(!orderexists) {
        return res.status(404).json({ error: 'Pedido nao encontrado' });
    }

    const updatedOrder = await prisma.order.update({
        where: { id: parseInt(id) },
        data: { status }
    });

    return res.status(200).json(updatedOrder);

});



export default router;