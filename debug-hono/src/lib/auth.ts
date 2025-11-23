import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import Database from "better-sqlite3";

// Create SQLite database
const db = new Database("./auth.db");

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
	secret: process.env.BETTER_AUTH_SECRET || "better-auth-secret-key-change-in-production",
	database: db,
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		openAPI({
			path: "/reference",
			theme: "default",
		}),
	],
});

