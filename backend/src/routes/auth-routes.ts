import { Router, Request, Response } from 'express';
import { prisma } from "../database/prisma";
import User from '../interfaces/auth-interface';

const bcrypt = require('bcryptjs');
const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    const { name, password, email, address, phone} : User = req.body as User;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            password: hashedPassword,
            email,
            address,
            phone
        }
    });

    return res.status(201).json(user);
})

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } : User = req.body as User;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return res.status(400).json({ message: 'Usuario não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'senha inválida' });
    }

    return res.status(200).json(user);
})


export default router;