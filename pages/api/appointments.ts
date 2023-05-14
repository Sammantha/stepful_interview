import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Appointment } from '../../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Appointment[]>) {
    const apts = await prisma.appointment.findMany({
        where: {
            startTime: {
                gt: new Date()
            },
            status: 'Available'
        },
        include: {
            coach: true,
            student: true
        },
    });

    return res.status(200).json(apts)
};
