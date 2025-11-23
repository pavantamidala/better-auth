# Better Auth Hono Debug Project

A minimal Hono project configured to debug the local Better Auth source code directly with full sourcemap support.

## Setup

1. **Install dependencies (from root of monorepo):**
   ```bash
   pnpm install
   ```

2. **Build Better Auth with sourcemaps (from root of monorepo):**
   ```bash
   pnpm build
   ```
   
   > **Important:** You must rebuild Better Auth whenever you make changes to the source code for the sourcemaps to work correctly.

3. **Start the development server:**
   ```bash
   # From root of monorepo
   pnpm --filter better-auth-debug-hono dev
   
   # Or from debug-hono directory
   cd debug-hono
   pnpm dev
   ```

4. **Open the app:**
   - Server: [http://localhost:3000](http://localhost:3000)
   - OpenAPI Reference: [http://localhost:3000/api/auth/reference](http://localhost:3000/api/auth/reference)

## Debugging

### Using VS Code Debugger

1. **Open VS Code in the root of the better-auth repository** (not in debug-hono)

2. **Go to the Run and Debug panel** (Ctrl+Shift+D / Cmd+Shift+D)

3. **Select "Hono: Debug Server"** configuration

4. **Set breakpoints in the Better Auth source code:**
   - `packages/better-auth/src/**/*.ts` (e.g., `packages/better-auth/src/init.ts`)
   - `packages/core/src/**/*.ts` (e.g., `packages/core/src/types/init-options.ts`)

5. **Press F5 to start debugging**

### Using `debugger` Statements

You can add `debugger;` statements directly in the Better Auth source code:
- `packages/better-auth/src/auth.ts`
- `packages/better-auth/src/init.ts`
- `packages/core/src/**/*.ts`
- Any other source file you want to inspect

The execution will pause when it hits the statement.

### Using Node.js Inspector

1. Start the server with inspector:
   ```bash
   node --inspect-brk node_modules/.bin/tsx src/index.ts
   ```

2. Open Chrome DevTools: `chrome://inspect`

3. Click "inspect" on your Node.js process

4. Set breakpoints in the source files

## Project Structure

- `src/lib/auth.ts` - Better Auth configuration with SQLite, email/password, and OpenAPI plugin
- `src/index.ts` - Hono server with Better Auth handler mounted
- `auth.db` - SQLite database file (created automatically)

## Features

- ✅ Uses local Better Auth source code directly (via TypeScript path mapping)
- ✅ Source maps enabled for debugging
- ✅ SQLite database (no external setup required)
- ✅ Email and password authentication
- ✅ OpenAPI plugin for API reference
- ✅ VS Code debugger configuration included
- ✅ Minimal setup - just install and run

## Notes

- The project uses SQLite, so data is persisted in `auth.db`
- All Better Auth source code is accessible for debugging
- Source maps are configured to map back to the original TypeScript files
- **Important:** Make sure to rebuild Better Auth (`pnpm build` from root) after making changes to source code for sourcemaps to work
- The TypeScript path mappings point to source files, but for production builds, the workspace links will use the built dist files
- When debugging, breakpoints set in `packages/better-auth/src/**/*.ts` and `packages/core/src/**/*.ts` will work because the sourcemaps point back to the original source files

