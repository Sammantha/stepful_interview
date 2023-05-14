import useSWR from 'swr';

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
                    <button key={`appointment_btn_${appointmentData.id}`}>
                        {btnText} - {appointmentData.startTime}
                    </button>
                );
            })}
        </>
    );
}