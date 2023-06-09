import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { Coach } from '../../../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Coach>) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    const coach = await prisma.coach.findUnique({
        where: {
            id: id,
        }
    });

    // Coach with id exists
    return res.status(200).json(coach)
};