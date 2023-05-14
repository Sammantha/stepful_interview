import { NextApiRequest, NextApiResponse } from 'next';
import { Appointment } from '../../../interfaces';

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
        id: 1,
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

export default function handler(req: NextApiRequest, res: NextApiResponse<Appointment | string>) {
    const { query } = req
    const id = parseInt(query.id as string, 10)
    const apt = appointments.find((c) => c.id === id)

    // Coach with id exists
    return apt
        ? res.status(200).json(apt)
        : res.status(404).json(`Appointment with id: ${id} not found.`)
};