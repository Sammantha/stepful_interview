import Link from 'next/link';
import Layout from '../../components/layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Student() {
    const { query } = useRouter()
    const { data, error, isLoading } = useSwr(`/api/appointment/${query.id}`, fetcher)

    if (error) return <div>Failed to load data</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return null

    // const [score, setScore] = useState(data?.satisfactionScore || '');
    // const [notes, setNotes] = useState(data?.notes || '');

    // const setSatisfactionScore = (event) => {
    //     event.preventDefault();
    //     setScore(event.target.value)
    // }

    // const submitNotes = (event) => {
    //     event.preventDefault()

    //     const combinedData = {
    //         ...data,
    //         satisfactionScore: parseInt(score),
    //         notes: notes
    //     }

    //     const JSONdata = JSON.stringify(combinedData);
    //     const endpoint = `/api/appointment/${event.target.id}`;
    //     const options = {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSONdata
    //     };

    //     fetch(endpoint, options).then(window.alert(`Thanks for submitting!`));
    // }

    return (
        <Layout>
            <h1>Appointment with {data?.student.name}</h1>
            <Link href="/" >Back to App Home</Link>

            <h4>Phone Number: {data?.student.phoneNumber}</h4>
            <h5>{data.startTime}</h5>

            {/* <form onSubmit={submitNotes} method="put">
                <label htmlFor='satisfactionScore'>Satisfaction Score:</label>
                <input name='satisfactionScore' onChange={setSatisfactionScore} value={score} />
                <p>Please enter a satisfaction score from 1 to 5</p>

                <label htmlFor='notes'>Notes:</label>
                <textarea name='notes' onChange={setNotes} value={notes} />
                <button type='submit'>Submit</button>
            </form> */}
        </Layout>
    );
}
