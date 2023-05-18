import Link from 'next/link';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSwr from 'swr'
import AppointmentList from '../../components/appointmentList';
import PastAppointmentList from '../../components/pastAppointmentList';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Student() {
    const [displayPast, setDisplayPast] = useState(false)
    const { query } = useRouter()
    const { data } = useSwr(
        query.id ? `/api/student/${query.id}` : null,
        fetcher
    )

    const showPast = () => {
        setDisplayPast(!displayPast)
    }

    if (!data) return null

    return (
        <Layout>
            <h1>Welcome, {data.name}!</h1>
            <button onClick={showPast}>{displayPast ? 'View Available Appointments' : 'View Past Appointments'}</button>
            <Link href="/" >Back to App Home</Link>

            {displayPast ?
                <>
                    <h3>Past appointments:</h3>
                    <PastAppointmentList requestURL={`/api/pastAppointments/student/${query.id}`} />
                </>
                :
                <>
                    <h3>Here are the curently available appointments:</h3>
                    <AppointmentList requestURL='/api/futureAppointments/futureAppointments' studentId={query.id} />
                </>
            }
        </Layout>
    );
}

