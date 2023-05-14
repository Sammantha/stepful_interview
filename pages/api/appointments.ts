import { NextApiRequest, NextApiResponse } from 'next';
import { Appointment } from '../../interfaces';

const appointments: Appointment[] = [
    {
        id: 1,
        coach: {
            id: 1,
            name: "Cassandra"
        },
        status: "Available",
        student: null,
        startTime: new Date(2023, 5, 14, 14, 0, 0, 0),
        endTime: new Date(2023, 5, 14, 16, 0, 0, 0),
        satisfactionScore: null,
        notes: null
    }, {
        id: 2,
        coach: {
            id: 2,
            name: "Chris"
        },
        status: "Available",
        student: null,
        startTime: new Date(2023, 5, 14, 15, 0, 0, 0),
        endTime: new Date(2023, 5, 14, 17, 0, 0, 0),
        satisfactionScore: null,
        notes: null
    }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Appointment[]>) {
    const apts = appointments.filter((c) => c.status === 'Available' && c.startTime > new Date());

    return res.status(200).json(apts)
};
