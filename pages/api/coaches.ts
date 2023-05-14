import { NextApiRequest, NextApiResponse } from 'next';
import { Coach } from '../../interfaces';

const coaches: Coach[] = [
    { id: 1, name: 'Cassandra' },
    { id: 2, name: 'Chris' }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Coach[]>) {
    return res.status(200).json(coaches)
};
