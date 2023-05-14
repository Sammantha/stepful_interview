import Link from 'next/link';
import Layout from '../components/layout';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function HomePage() {
    const { data: coaches, error: coachesError, isLoading: isLoadingCoaches } = useSWR('/api/coaches', fetcher)
    const { data: students, error: studentsError, isLoading: isLoadingStudents } = useSWR('/api/students', fetcher)

    if (coachesError || studentsError) return <div>Failed to load data</div>
    if (isLoadingCoaches || isLoadingStudents) return <div>Loading...</div>
    if (!coaches || !students) return null

    return (
        <Layout>
            <h1>App Homepage</h1>
            <div>
                <h2>Coaches</h2>
                {coaches && coaches.map(({ id, name }) => {
                    return <button key={`coach_button_${id}`}> <Link href={`/coaches/${id}`} > Coach {name} </Link></button >
                })}
            </div>
            <div>
                <h2>Students</h2>
                {students && students.map(({ id, name }) => {
                    return <button key={`student_button_${id}`}><Link href={`/students/${id}`} >Student {name}</Link></button>
                })}
            </div>
        </Layout>
    );
}