import useSWR from 'swr';
import { Card, Typography } from '@mui/material';
import { css } from '@emotion/css';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function StudentAppointmentDetailList({ requestURL }) {
    const { data, error, isLoading } = useSWR(requestURL, fetcher)

    if (error) return <div>Failed to load data</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return null

    return (
        <>
            {data && data.length === 0 && <h4>No data</h4>}
            {data && data.map((appointmentData) => {
                const btnText = appointmentData.coach?.name;
                const start = new Date(appointmentData.startTime)
                const leadingZeroMinutes = start.getMinutes() < 10 ? '0' + start.getMinutes().toString() : start.getMinutes()
                const amPm = start.getHours() >= 12 ? 'pm' : 'am'
                const startTime = `${start.getMonth() + 1}/${start.getDate()}/${start.getFullYear()} ${start.getHours()}:${leadingZeroMinutes} ${amPm}`;

                return (
                    <Card className={css`padding: 10px; `} key={appointmentData.id} variant="outlined">
                        <Typography variant="h5">{btnText}</Typography>
                        <div>
                            <Typography variant='body1'>Time: {startTime}</Typography>
                            <Typography variant='body1'>Score: {appointmentData?.satisfactionScore ? appointmentData.satisfactionScore : ''}</Typography>
                            <Typography variant='body1'>Notes: {appointmentData?.notes ? appointmentData.notes : ''}</Typography>
                        </div>
                    </Card>
                );
            })}
        </>
    );
}