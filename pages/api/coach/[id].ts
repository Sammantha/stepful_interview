import { NextApiRequest, NextApiResponse } from 'next';
import { Coach } from '../../../interfaces';

const coaches: Coach[] = [
    { id: 1, name: 'Cassandra' },
    { id: 2, name: 'Chris' }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Coach | string>) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    const coach = coaches.find((c) => c.id === id)

    // Coach with id exists
    return coach
        ? res.status(200).json(coach)
        : res.status(404).json(`Coach with id: ${id} not found.`)
};