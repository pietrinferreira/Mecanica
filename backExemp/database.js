import postgres from 'postgres';
const sql = postgres('postgres://postgres:senaisp@localhost:5432/saep_db');
export default sql;