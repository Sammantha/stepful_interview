import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import useSwr from 'swr'
import ScheduleList from '../../components/scheduleList';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Coach() {
    const [displayPast, setDisplayPast] = useState(false)
    const { query } = useRouter()
    const { data } = useSwr(
        query.id ? `/api/coach/${query.id}` : null,
        fetcher
    )

    const showPast = () => {
        setDisplayPast(!displayPast)
    }

    if (!data) return null

    return (
        <Layout>
            <h1>Coach {data.name}'s Upcoming Schedule</h1>
            <div>
                <Link href="/" >Back</Link>
                <button onClick={showPast}>{displayPast ? 'View Future Appointments' : 'View Past Appointments'}</button>
                <Link href={`/appointments/add?id=${query.id}`} >Add To Availability</Link>
            </div>

            {displayPast ?
                <>
                    <h3>Your past appointments:</h3>
                    <ScheduleList
                        requestURL={`/api/pastAppointments/coach/${query.id}`}
                    />
                </>
                :
                <>
                    <h3>Here are all your future appointments:</h3>
                    <ScheduleList
                        requestURL={`/api/futureAppointments/coach/${query.id}`}
                    />
                </>
            }
        </Layout>
    );
}

