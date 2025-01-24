import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        try {
            const {userId, categoryId} = req.body;

            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    categories: true
                }
            });

            if(!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const affirmations = await prisma.affirmation.findMany({
                where: { 
                    categoryId: categoryId,
                }   
            });
          
            if (!affirmations.length) {
                return res.status(404).json({ error: 'No affirmations found' });
            }
          
            const randomAffirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
            
            return res.status(200).json({
                message: randomAffirmation.text,
                title: 'Your Daily Affirmation',
                userId: user.id
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to send notification' });
        }
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
}