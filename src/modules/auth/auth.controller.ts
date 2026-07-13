import { Request, Response } from 'express';
import { registerUser } from './auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};