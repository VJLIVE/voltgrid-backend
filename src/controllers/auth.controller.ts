import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../config/db";
import { users } from "../db/schema";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.insert(users).values({
            name,
            email,
            password: hashedPassword,
            role: role || "driver"
        });
        res.json({ message: "User created successfully"});
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email)
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const validPassword = await bcrypt.compare(password, user.password!);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }
  
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.json({ token });
};