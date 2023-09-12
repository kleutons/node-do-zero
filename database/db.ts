import dotenv from 'dotenv';
import postgres from 'postgres';

dotenv.config()


// db.js
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

console.log(URL);
export const sql = postgres(URL, { ssl: 'require' });