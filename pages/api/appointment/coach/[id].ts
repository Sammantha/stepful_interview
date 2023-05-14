import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { Appointment } from '../../../../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Appointment[] | string>) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    const apts = await prisma.appointment.findMany({
        where: {
            coachId: id,
            startTime: {
                gt: new Date()
            }
        }
    });

    // Coach with id exists
    return apts
        ? res.status(200).json(apts)
        : res.status(404).json(`Appointment with id: ${id} not found.`)
};