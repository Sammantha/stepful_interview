import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { Appointment } from '../../../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Appointment>) {
    const { query, method, body } = req
    const id = parseInt(query.id as string, 10)

    switch (method) {
        case 'GET':
            return prisma.appointment.findUnique({
                where: {
                    id,
                }
            });
        case 'POST':
            const startTime = new Date(body.dateValue)
            const endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours() + 2, startTime.getMinutes(), startTime.getSeconds());

            return prisma.appointment.create({
                data: {
                    coachId: id,
                    status: 'Available',
                    startTime: startTime,
                    endTime: endTime
                },
                include: {
                    coach: true
                }
            }).then((resp) => res.status(200).json(resp));

        default:
            break;
    }
};