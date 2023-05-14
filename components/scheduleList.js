import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ScheduleList({ coachId }) {
    const { data, error, isLoading } = useSWR(`/api/appointment/coach/${coachId}`, fetcher)

    if (error) return <div>Failed to load data</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return null

    return (
        <>
            {data && data.map((appointmentData) => {
                const btnText = appointmentData.student
                    ? `{appointmentData.student?.name}: {appointmentData.student?.phoneNumber}`
                    : 'Available';

                return (
                    // div or buttton or something I can listen to to trigger a confirm modal
                    // confirm modal yes -> PUT request to book that apt.
                    // give the user a success toast
                    <button key={`appointment_btn_${appointmentData.id}`}>
                        {btnText} - {appointmentData.startTime}
                    </button>
                );
            })}
        </>
    );
}