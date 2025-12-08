import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: '.env.local' });

export default defineConfig({
  schema: './lib/db/schema.ts', // Path to your schema file
  out: './lib/db/migrations', // Migrations in the same folder structure
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});