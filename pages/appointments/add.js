import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import Link from 'next/link';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function AddAppointment() {
    const [dateValue, setDate] = useState(new Date());
    const router = useRouter();
    const coachId = router.query.id

    const submitAvailability = async (event) => {
        event.preventDefault();

        const JSONdata = JSON.stringify({ dateValue: dateValue });
        const endpoint = `/api/appointment/${coachId}`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        };

        fetch(endpoint, options).then(() => {
            window.alert(`Thanks for adding availability to your calendar!`)
            router.push(`/coaches/${coachId}`)
        });
    }

    return (
        <Layout>
            <h1>Add Availability</h1>
            <Link href={`/coaches/${coachId}`} >Back</Link>
            <h4>Your appointment will be 2 hours long, starting at the time you enter.</h4>
            <form onSubmit={submitAvailability} method="post">
                <label htmlFor="start_time_input">Start Time:</label>
                <DateTimePicker onChange={setDate} value={dateValue} />
                <button type="submit">Submit</button>
            </form>
        </Layout>
    )
}