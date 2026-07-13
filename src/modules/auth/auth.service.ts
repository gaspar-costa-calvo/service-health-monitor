import bcrypt from 'bcrypt';
import prisma from '../../config/database';

export const registerUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email already in use');

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed },
    select: { id: true, email: true, createdAt: true }, // never return password
  });

  return user;
};