import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Appointment } from '../../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Appointment[]>) {
    const apts = await prisma.appointment.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });
    const apts = appointments.filter((c) => c.status === 'Available' && c.startTime > new Date());

    return res.status(200).json(apts)
};
