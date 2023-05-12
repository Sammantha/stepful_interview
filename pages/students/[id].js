import Link from 'next/link';
import Layout from '../../components/layout';
import { getAllStudentIds, getStudentData } from '../../lib/students';

export async function getStaticProps({ params }) {
    const studentData = getStudentData(params.id);
    return {
        props: {
            studentData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllStudentIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Student({ studentData }) {
    return (
        <Layout>
            <h1>Welcome, {studentData.params.name}!</h1>
            <Link href="/" >Back to App Home</Link>
        </Layout>
    );
}

