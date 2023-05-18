import Link from 'next/link';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSwr from 'swr'
import StudentAppointmentDetailList from '../../components/studentAppointmentDetailList';
import AvailableAppointmentList from '../../components/availableAppointmentList';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Student() {
    const [displayIndex, setDisplayIndex] = useState(0)
    const { query } = useRouter()
    const { data } = useSwr(
        query.id ? `/api/student/${query.id}` : null,
        fetcher
    )

    const switchDisplay = (event) => {
        setDisplayIndex(event.target.id)
    }

    const fetchDisplay = () => {
        switch (parseInt(displayIndex)) {
            case 1:
                return (
                    <>
                        <h3>Here are the curently available appointments:</h3>
                        <AvailableAppointmentList requestURL='/api/futureAppointments/futureAppointments' studentId={query.id} />
                    </>
                );
            case 2:
                return (
                    <>
                        <h3>Past appointments:</h3>
                        <StudentAppointmentDetailList requestURL={`/api/pastAppointments/student/${query.id}`} />
                    </>
                );
            default:
                return (
                    <>
                        <h3>Here are your future appointments:</h3>
                        <StudentAppointmentDetailList requestURL={`/api/futureAppointments/student/${query.id}`} />
                    </>
                );
        }
    }

    if (!data) return null

    return (
        <Layout>
            <h1>Welcome, {data.name}!</h1>
            <Link href="/" >Back to App Home</Link>
            <div>
                <button id={0} disabled={displayIndex === 0} onClick={switchDisplay}>View Future Appointments</button>
                <button id={1} disabled={displayIndex === 1} onClick={switchDisplay}>View Available Appointments</button>
                <button id={2} disabled={displayIndex === 2} onClick={switchDisplay}>View Past Appointments</button>
            </div>
            {fetchDisplay()}
        </Layout>
    );
}

