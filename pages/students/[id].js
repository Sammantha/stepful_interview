import Link from 'next/link';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import useSwr from 'swr'
import AppointmentList from '../../components/appointmentList';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Student() {
    const { query } = useRouter()
    const { data } = useSwr(
        query.id ? `/api/student/${query.id}` : null,
        fetcher
    )

    if (!data) return null

    return (
        <Layout>
            <h1>Welcome, {data.name}!</h1>
            <Link href="/" >Back to App Home</Link>

            <h3>Here are the curently available appointments:</h3>
            <AppointmentList />
        </Layout>
    );
}

