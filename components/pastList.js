import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function PastList({ coachId }) {
    const { data, error, isLoading } = useSWR(`/api/appointments/coach/${coachId}`, fetcher)

    if (error) return <div>Failed to load data</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return null

    return (
        <>
            {data && data.length === 0 && <h4>You have no past appointments</h4>}
            {data && data.map((appointmentData) => {
                const btnText = `{appointmentData.student?.name}: {appointmentData.student?.phoneNumber}`;
                return (
                    <div>
                        <div>
                            <Link href={`/appointments/${appointmentData.id}`}>
                                {btnText}
                            </Link>
                        </div>
                        <div>
                            Time: {appointmentData.startTime}
                            Score: {appointmentData.satisfactionScore ? appointmentData.satisfactionScore : ''}
                            Notes: {appointmentData.notes ? appointmentData.notes : ''}
                        </div>
                    </div>
                );
            })}
        </>
    );
}