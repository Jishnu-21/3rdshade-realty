# Database Setup Guide

## Prerequisites
- PostgreSQL database (local or cloud)
- Node.js and npm installed

## Environment Variables

Create a `.env` file in the `client` directory with the following:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
```

### Examples:

**Local PostgreSQL:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/3rdshade_realty"
```

**Supabase:**
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

**Railway:**
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@containers-us-west-[ID].railway.app:5432/railway"
```

## Setup Commands

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

3. **Push schema to database:**
   ```bash
   npm run db:push
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## Database Management

- **View database in Prisma Studio:**
  ```bash
  npm run db:studio
  ```

- **Create a new migration:**
  ```bash
  npm run db:migrate
  ```

## Troubleshooting

If you get import errors for `@prisma/client` or `bcryptjs`:
1. Make sure you've run `npm install`
2. Run `npm run db:generate` to generate the Prisma client
3. Restart your TypeScript server in your editor

The TypeScript path mapping in `tsconfig.json` should resolve the Prisma client imports automatically. 