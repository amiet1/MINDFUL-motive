import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword
        }
      });

      return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
  }

  if (req.method === 'GET') {
    // Get user's saved affirmations
    const { userId } = req.query;
    try {
      const user = await prisma.user.findUnique({
        where: { id: String(userId) },
        include: {
          categories: {
            include: {
              affirmations: true
            }
          }
        }
      });
      return res.status(200).json(user?.categories || []);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch user data' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}