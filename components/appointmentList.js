import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AppointmentList() {
    const { data, error, isLoading } = useSWR('/api/appointments', fetcher)

    if (error) return <div>Failed to load data</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return null

    return (
        <>
            {data && data.map(({ id, coach, startTime }) => {
                return (
                    // div or buttton or something I can listen to to trigger a confirm modal
                    // confirm modal yes -> PUT request to book that apt.
                    // give the user a success toast
                    <button key={`appointment_btn_${id}`}>
                        {coach.name} - {startTime}
                    </button>
                );
            })}
        </>
    );
}