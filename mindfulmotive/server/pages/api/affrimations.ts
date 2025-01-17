import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get random affirmation by category
    if (req.query.categoryId) {
      try {
        const affirmations = await prisma.affirmation.findMany({
          where: { categoryId: String(req.query.categoryId) }
        });
        const random = Math.floor(Math.random() * affirmations.length);
        return res.status(200).json(affirmations[random]);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch affirmation' });
      }
    }

    // Get all categories with affirmations
    try {
      const categories = await prisma.category.findMany({
        include: {
          affirmations: true
        }
      });
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }

  if (req.method === 'POST') {
    // Save affirmation for user
    try {
      const { userId, affirmationId } = req.body;
      const savedAffirmation = await prisma.affirmation.update({
        where: { id: affirmationId },
        data: {
          user: {
            connect: { id: userId }
          }
        }
      });
      return res.status(200).json(savedAffirmation);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save affirmation' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}