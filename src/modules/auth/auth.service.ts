import bcrypt from "bcrypt";
import prisma from "../../config/database";
import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "../../config/env";
import { AppError } from "../../utils/AppError";

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AppError("Email already in use", 409);

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed },
    select: { id: true, email: true, createdAt: true }, // never return password
  });

  return user;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AppError("Invalid credentials", 401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError("Invalid credentials", 401);

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    ENV.JWT_SECRET,
    { expiresIn: ENV.JWT_EXPIRES_IN } as SignOptions,
  );

  return { token, user: { id: user.id, email: user.email } };
};
