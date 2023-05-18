import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AvailableAppointmentList({ requestURL, studentId }) {
    const { data, error, isLoading } = useSWR(requestURL, fetcher)

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
            {data && data.length === 0 && <h4>No data</h4>}
            {data && data.map(({ id, coach, startTime }) => {
                const start = new Date(startTime)
                const leadingZeroMinutes = start.getMinutes() < 10 ? '0' + start.getMinutes().toString() : start.getMinutes()
                const amPm = start.getHours() >= 12 ? 'pm' : 'am'
                const formattedStartTime = `${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()} ${start.getHours()}:${leadingZeroMinutes}${amPm}`;

                return (
                    <button onClick={bookApt} id={id} key={`appointment_btn_${id}`}>
                        Coach {coach.name} - {formattedStartTime}
                    </button>
                );
            })}
        </>
    );
}