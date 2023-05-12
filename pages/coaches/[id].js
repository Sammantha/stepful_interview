import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllCoachIds, getCoachData } from '../../lib/coaches';

export async function getStaticProps({ params }) {
    const coachData = getCoachData(params.id);
    return {
        props: {
            coachData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllCoachIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Coach({ coachData }) {
    return (
        <Layout>
            <h1>Coach {coachData.params.name}'s Upcoming Schedule</h1>
            <Link href="/" >Back to App Home</Link>
        </Layout>
    );
}

