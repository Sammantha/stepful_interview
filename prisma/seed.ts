import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    await prisma.coach.create({
        data: {
            name: 'Cassandra'
        }
    })
    await prisma.coach.create({
        data: {
            name: 'Chris'
        }
    })
    await prisma.student.create({
        data: {
            name: 'Samuel',
            phoneNumber: '4064064064'
        }
    })
    await prisma.student.create({
        data: {
            name: 'Sara',
            phoneNumber: '3103103103'
        }
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })