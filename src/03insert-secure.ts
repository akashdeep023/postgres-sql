// 💡This is an insecure way to store data in your tables.
// When you expose this functionality eventually via HTTP, someone can do an SQL INJECTION to get access to your data/delete your data.

// More secure way to store data.
import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Async function to insert data into a table
async function insertData(username: string, email: string, password: string) {
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
		// Use parameterized query to prevent SQL injection
		const insertQuery =
			"INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
		const values = [username, email, password];
		const res = await client.query(insertQuery, values);
		console.log("Insertion success:", res); // Output insertion result
	} catch (err) {
		console.error("Error during the insertion:", err);
	} finally {
		await client.end(); // Close the client connection
	}
}

// Example usage
insertData("username5", "user5@example.com", "user_password").catch(
	console.error
);
