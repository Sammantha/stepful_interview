import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AppointmentList({ studentId }) {
    const { data, error, isLoading } = useSWR('/api/appointments', fetcher)

    if (error) return <div>Failed to load data</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return null

    const bookApt = (event) => {
        event.preventDefault()

        const JSONdata = JSON.stringify({
            studentId: studentId,
            status: 'Booked'
        });
        const endpoint = `/api/appointment/${event.target.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        };

        fetch(endpoint, options).then(window.alert(`Thanks for booking an appointment! Your selected coach will call you at the selected time.`));
    }

    return (
        <>
            {data && data.length === 0 && <h4>Sorry, there are no appointments currently available</h4>}
            {data && data.map(({ id, coach, startTime }) => {
                return (
                    <button onClick={bookApt} id={id} key={`appointment_btn_${id}`}>
                        {coach.name} - {startTime}
                    </button>
                );
            })}
        </>
    );
}