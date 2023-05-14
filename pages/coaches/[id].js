import Link from 'next/link';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Coach() {
    const { query } = useRouter()
    const { data } = useSwr(
        query.id ? `/api/coach/${query.id}` : null,
        fetcher
    )

    if (!data) return null

    return (
        <Layout>
            <h1>Coach {data.name}'s Upcoming Schedule</h1>
            <Link href="/" >Back to App Home</Link>
        </Layout>
    );
}

