import { Router, Request, Response } from "express";
import { authenticate } from "../auth/auth.middleware";

const router = Router();

router.get("/", authenticate, (req: Request, res: Response) => {
  res.json({ message: `Hello ${req.user?.email} — you are authenticated` });
});

export default router;
