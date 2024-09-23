# InterIIT 2024 Prepathon

## Setup

The repository is in a monorepo format. The packages directory contains the two parts: `prepathon-frontend` and `prepathon-backend`. The frontend is a React app and the backend is a Hono.js app.

- First `bun install` in the root directory to install the dependencies.
- Then in `packages/prepathon-backend`, run `bun run migration:local` to setup the database.
- And then in `packages/prepathon-backend`, add the .dev.vars file (send me a message).

- Then from the root directory, run `bun run dev` to start both the backend and frontend.
