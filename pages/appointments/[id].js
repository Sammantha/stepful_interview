import Link from 'next/link';
import { useState } from 'react';
import Layout from '../../components/layout';
import prisma from '../../lib/prisma';

export async function getServerSideProps(context) {
    const id = parseInt(context.query.id)

    return prisma.appointment.findUnique({
        where: {
            id,
        },
        include: {
            student: true,
            coach: true
        }
    }).then((resp) => {
        return {
            props: {
                ...resp,
                startTime: JSON.parse(JSON.stringify(resp.startTime)),
                endTime: JSON.parse(JSON.stringify(resp.endTime))
            }
        }
    });
}

export default function Student(props) {
    const [score, setScore] = useState(props.satisfactionScore || '');
    const [notes, setNotes] = useState(props.notes || '');

    const onChangeScore = (event) => {
        event.preventDefault();
        setScore(event.target.value)
    }

    const onChangeNotes = (event) => {
        event.preventDefault();
        setNotes(event.target.value)
    }

    const submitNotes = (event) => {
        event.preventDefault()

        const combinedData = {
            satisfactionScore: parseInt(score),
            notes: notes
        }

        const JSONdata = JSON.stringify(combinedData);
        const endpoint = `/api/appointment/${event.target.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        };

        fetch(endpoint, options).then(window.alert(`Thanks for submitting!`));
    }

    return (
        <Layout>
            <h1>Appointment with {props.student.name}</h1>
            <Link href="/" >Back to App Home</Link>

            <h4>Phone Number: {props.student.phoneNumber}</h4>
            <h5>{props.startTime}</h5>

            <form onSubmit={submitNotes} id={props.id} method="put">
                <label htmlFor='satisfactionScore'>Satisfaction Score:</label>
                <input name='satisfactionScore' onChange={onChangeScore} value={score} />
                <p>Please enter a satisfaction score from 1 to 5</p>

                <label htmlFor='notes'>Notes:</label>
                <textarea name='notes' onChange={onChangeNotes} value={notes} />
                <button type='submit'>Submit</button>
            </form>
        </Layout>
    );
}
