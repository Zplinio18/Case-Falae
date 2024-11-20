import { Router, Request, Response } from 'express';
import { prisma } from "../database/prisma";

const router = Router();
const bcrypt = require('bcryptjs');

router.post('/create', async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            password: hashedPassword,
            email,
            address: '',
            phone: '',
            isAdmin: true
        }
    });

    return res.status(201).json(user);
})


export default router;