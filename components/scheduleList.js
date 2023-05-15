import useSWR from 'swr';

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
                    <button key={`appointment_btn_${appointmentData.id}`}>
                        {btnText} - {appointmentData.startTime}
                    </button>
                );
            })}
        </>
    );
}