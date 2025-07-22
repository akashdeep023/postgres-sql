// 1. Create a simple Node.js app that lets you put data
// Create a function that let’s you insert data into a table. Make it async, make sure client.connect resolves before u do the insert

import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Async function to insert data into a table
async function insertData() {
	const client = new Client({
		// host: "localhost",
		// port: 5432,
		// database: "postgres",
		// user: "postgres",
		// password: "mysecretpassword",

		connectionString: process.env.POSTGRE_SQL,
	});

	try {
		await client.connect(); // Ensure client connection is established
		const insertQuery =
			"INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
		const res = await client.query(insertQuery);
		console.log("Insertion success:", res); // Output insertion result
	} catch (err) {
		console.error("Error during the insertion:", err);
	} finally {
		await client.end(); // Close the client connection
	}
}

insertData();
