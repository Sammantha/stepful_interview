import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ScheduleList({ coachId }) {
    const { data, error, isLoading } = useSWR(`/api/appointment/coach/${coachId}`, fetcher)

    if (error) return <div>Failed to load data</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return null

    return (
        <>
            {data && data.length === 0 && <h4>You have no future appointments scheduled</h4>}
            {data && data.map((appointmentData) => {
                const btnText = appointmentData.studentId
                    ? `${appointmentData.student?.name}: ${appointmentData.student?.phoneNumber}`
                    : 'Available';

                return (
                    <div key={appointmentData.id}>
                        <Link href={`/appointments/${appointmentData.id}`}>
                            {btnText}
                        </Link>
                        <div>
                            Time: {appointmentData.startTime}
                            Score: {appointmentData?.satisfactionScore ? appointmentData.satisfactionScore : ''}
                            Notes: {appointmentData?.notes ? appointmentData.notes : ''}
                        </div>
                    </div>
                );
            })}
        </>
    );
}