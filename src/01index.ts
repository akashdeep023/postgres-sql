// Write a function to create a users table in your database.
import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
	// host: "my.database-server.com",
	// port: 5334,
	// database: "database-name",
	// user: "database-user",
	// password: "secretpassword!!",

	connectionString: process.env.POSTGRE_SQL,
});

async function createUsersTable() {
	await client.connect();
	const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
	console.log(result);
}
createUsersTable();
