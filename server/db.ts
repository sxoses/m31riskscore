import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

const fallbackConnection = "postgresql://postgres:postgres@localhost:5432/postgres";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? fallbackConnection,
});

export const db = drizzle({ client: pool, schema });