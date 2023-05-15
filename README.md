# stepful-interview
This project was created to answer an interview prompt from stepful.
Please review the design docs for this project on [Google Docs](https://docs.google.com/document/d/1r2ESS_8K9tZPctrYzaRY1wmNk0qpziVGsWimzWetlh0/edit?usp=sharing)

A production version of this project is hosted on [Vercel](stepful-interview.vercel.app).

## Running This Project Locally
1. `npm i` to install dependencies
2. Contact Sam for local environment vars to access the dev Database
3. Create `.env.local` in root directory; place local env vars in there
4. Create `.env` file in `/prisma` dir and copy contents of `.env.local` into it
5. Run `npx prisma db seed` to seed the local DB with 2 coaches and 2 studens
6. `npm run dev` starts the dev server on `localhost:3000`

## Local Prisma Commands
- `npx prisma studio` to visualize the database
- `npx prisma db seed` to run the seed.ts file and add 2 hard-coded coaches and students
- `npx prisma generate` to process Prisma schema changes
- `npx prisma db push` to push Prisma DB changes to Vercel