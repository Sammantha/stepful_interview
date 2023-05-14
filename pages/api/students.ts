import { NextApiRequest, NextApiResponse } from 'next';
import { Student } from '../../interfaces';

const students: Student[] = [
    { id: 1, name: 'Samuel' },
    { id: 2, name: 'Sara' }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Student[]>) {
    return res.status(200).json(students)
};
