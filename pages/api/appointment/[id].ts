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
                },
                include: {
                    student: true,
                    coach: true
                }
            }).then((resp) => res.status(200).json(resp));
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
                    coach: true,
                    student: true
                }
            }).then((resp) => res.status(200).json(resp));
        case 'PUT':
            const updates = body

            let data = {
                ...updates
            }

            if (updates.studentId) {
                data = {
                    ...data,
                    student: {
                        connect: { id: updates.studentId },
                    },
                }
            }

            return prisma.appointment.update({
                where: {
                    id
                },
                data,
                include: {
                    coach: true
                }
            }).then((resp) => res.status(200).json(resp));
        default:
            break;
    }
};