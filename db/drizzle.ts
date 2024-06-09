import {neon} from '@neondatabase/serverless';
import {drizzle} from 'drizzle-orm/neon-http'
import * as schema from './schema';

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, {schema}); 

//Works like SQL
// const accounts2 = db.select().from(accounts).where(eq())
//You also can use Schema query
// const accounts2 = db.query.accounts.findFirst({
//     where:{
//         id: {id: string} -> this is a prop
//     }
// })
