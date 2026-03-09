import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../config/db";
import { users } from "../db/schema";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword
    });

    res.json({ message: "User registered successfully" });

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
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.json({ token });
};