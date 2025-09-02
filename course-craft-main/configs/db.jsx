import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
const sql = neon(
  "postgresql://accounts:Jp9iuo8wIAkt@ep-divine-firefly-a52tsz0h.us-east-2.aws.neon.tech/project-ai?sslmode=require"
);
export const db = drizzle(sql);
