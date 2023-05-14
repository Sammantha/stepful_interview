import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { Appointment } from '../../../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Appointment>) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    const apt = await prisma.appointment.findUnique({
        where: {
            id: id,
        }
    });

    return res.status(200).json(apt)
};