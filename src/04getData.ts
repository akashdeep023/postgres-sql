// Query data
// Write a function getUser that lets you fetch data from the database given a email as input.

import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

// Async function to fetch user data from the database given an email
async function getUser(email: string) {
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
		const query = "SELECT * FROM users WHERE email = $1";
		const values = [email];
		const result = await client.query(query, values);

		if (result.rows.length > 0) {
			console.log("User found:", result.rows[0]); // Output user data
			return result.rows[0]; // Return the user data
		} else {
			console.log("No user found with the given email.");
			return null; // Return null if no user was found
		}
	} catch (err) {
		console.error("Error during fetching user:", err);
		throw err; // Rethrow or handle error appropriately
	} finally {
		await client.end(); // Close the client connection
	}
}

// Example usage
getUser("user5@example.com").catch(console.error);
