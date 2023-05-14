export type Coach = {
    id: number,
    name: string,
}

export type Student = {
    id: number,
    name: string,
    phoneNumber: string,
}

export type Appointment = {
    id: number,
    coach: Coach,
    status: string,
    student: Student,
    startTime: Date,
    endTime: Date,
    satisfactionScore: number,
    notes: string
}