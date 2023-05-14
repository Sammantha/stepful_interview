import { NextApiRequest, NextApiResponse } from 'next';
import { Student } from '../../../interfaces';

const students: Student[] = [
    { id: 1, name: 'Samuel', phoneNumber: '4064064064' },
    { id: 2, name: 'Sara', phoneNumber: '3103103103' }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Student | string>) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    const student = students.find((c) => c.id === id)

    // Student with id exists
    return student
        ? res.status(200).json(student)
        : res.status(404).json(`Student with id: ${id} not found.`)
};