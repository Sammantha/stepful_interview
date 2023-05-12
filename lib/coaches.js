import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const coachesDirectory = path.join(process.cwd(), 'coaches');

export function getAllCoachIds() {
    const fileNames = fs.readdirSync(coachesDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            }
        };
    });
}

export function getCoachData(id) {
    const fullPath = path.join(coachesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the coach metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
        params: {
            id,
            ...matterResult.data,
        }
    };
}

export function getSortedCoachesData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(coachesDirectory)
    const allCoachesData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(coachesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })
    // Sort posts by date
    return allCoachesData.sort((a, b) => {
        if (a.name < b.name) {
            return 1
        } else {
            return -1
        }
    })
}