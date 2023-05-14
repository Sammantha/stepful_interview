import { NextApiRequest, NextApiResponse } from 'next';
import { Student } from '../../interfaces';

const students: Student[] = [
    { id: 1, name: 'Samuel', phoneNumber: '4064064064' },
    { id: 2, name: 'Sara', phoneNumber: '3103103103' }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Student[]>) {
    return res.status(200).json(students)
};
