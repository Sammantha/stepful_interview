import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { Appointment } from '../../../../interfaces';

// All a certain coach's PAST appointments
export default async function handler(req: NextApiRequest, res: NextApiResponse<Appointment[]>) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    const apts: Appointment[] = await prisma.appointment.findMany({
        where: {
            coachId: id,
            startTime: {
                lt: new Date()
            },
            status: {
                not: 'Available'
            },
            studentId: {
                not: null
            }
        },
        include: {
            coach: true,
            student: true
        }
    });

    // Coach with id exists
    return res.status(200).json(apts)
};