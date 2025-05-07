import { PrismaClient } from "@prisma/client";


const prisma =  new PrismaClient()

async function main() {
    await prisma.movie.deleteMany({})

    const movies = [
        {
            title: 'Harry Potter and the Philosophers Stone',
            releaseDate: new Date('2001-11-16'),
            synopsis:'An orphaned boy discovers he is a wizard on his eleventh birthday and enters a magical world as he begins his first year at Hogwarts School of Witchcraft and Wizardry.'
        },
        {
            title: 'V4 Company - The Movie',
            releaseDate: new Date('2012-04-04'),
            synopsis: 'The company is working on qualifying and expanding its 250 branches, in addition to new acquisitions for the group. With clients such as XP, iFood and Arezzo Quote from Arezzo Co.'
        },
        {
            title: 'The Dark Knight',
            releaseDate: new Date('2008-07-18'),
            synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
        }
    ];

    for(const movie of movies) {
        await prisma.movie.create({
            data: movie
        });
    }

    console.log('Seed created')
}

main()
.catch((e) => {
    console.error('Error during seed', e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});


