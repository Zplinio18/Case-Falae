import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export async function verifyPermition(req: Request, res: Response, next: Function) {
    const adminId = req.body.adminId;

    const user = await prisma.user.findUnique({
        where: { id: adminId },
    });

    if (!user || !user.isAdmin) {
        return res.status(401).json({ message: 'Você não tem permissão para acessar este recurso' });
    }

    next();
}