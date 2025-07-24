// Write a function to create a address table in your database.
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

async function createAddressTable() {
	await client.connect();
	const result = await client.query(`
        CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `);
	console.log(result);
}
createAddressTable();
