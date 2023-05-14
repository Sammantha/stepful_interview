import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Coach } from '../../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Coach[]>) {
    const coaches = await prisma.coach.findMany();
    return res.status(200).json(coaches)
};
