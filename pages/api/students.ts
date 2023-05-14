import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Student } from '../../interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Student[]>) {
    const students = await prisma.student.findMany();
    return res.status(200).json(students)
};
