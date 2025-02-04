import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
const sql = neon(process.env.DATABASE_URL!);//디비에 연결한 클라이언트 객체
const db = drizzle(sql, { schema });//클라이언트객체를 orm에 넣은 orm인스턴스

export default db;
