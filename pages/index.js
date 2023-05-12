import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedCoachesData } from '../lib/coaches';
import { getSortedStudentsData } from '../lib/students';

export async function getStaticProps() {
    const sortedCoachesData = getSortedCoachesData();
    const sortedStudentsData = getSortedStudentsData();
    return {
        props: {
            sortedCoachesData,
            sortedStudentsData
        },
    };
}

export default function HomePage({ sortedCoachesData, sortedStudentsData }) {
    return (
        <Layout>
            <h1>App Homepage</h1>
            <div>
                <h2>Coaches</h2>
                {sortedCoachesData.map(({ id, name }) => {
                    return <button key={`coach_button_${id}`}><Link href={`/coaches/${id}`} >Coach {name}</Link></button>
                })}
            </div>
            <div>
                <h2>Students</h2>
                {sortedStudentsData.map(({ id, name }) => {
                    return <button key={`student_button_${id}`}><Link href={`/students/${id}`} >Student {name}</Link></button>
                })}
            </div>
        </Layout>
    );
}