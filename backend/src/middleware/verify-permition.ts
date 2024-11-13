import { Request, Response } from "express";
import User from "../interfaces/auth-interface";

export async function verifyPermition(req: Request, res: Response, next: Function) {
    const { isAdmin } = req.body as User;

    if (!isAdmin) {
        return res.status(401).json({ message: 'Você não tem permissão para acessar este recurso' });
    }

    next();
}