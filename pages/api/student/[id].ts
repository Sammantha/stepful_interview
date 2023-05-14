import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { Student } from '../../../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Student>) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    const student = await prisma.student.findUnique({
        where: {
            id: id,
        }
    });

    // Student with id exists
    return res.status(200).json(student)
};