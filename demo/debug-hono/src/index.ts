import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";

const app = new Hono();

// Enable CORS for all routes
app.use(
	"*",
	cors({
		origin: "*",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

// Mount Better Auth handler
app.on(["POST", "GET", "PUT", "DELETE", "PATCH"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

// Health check endpoint
app.get("/", (c) => {
	return c.json({
		message: "Better Auth Debug Server",
		endpoints: {
			auth: "/api/auth/*",
			openApiReference: "/api/auth/reference",
		},
	});
});

const port = Number(process.env.PORT) || 3000;

console.log(`🚀 Server running on http://localhost:${port}`);
console.log(`📚 OpenAPI Reference: http://localhost:${port}/api/auth/reference`);

serve({
	fetch: app.fetch,
	port,
});

