# VaultX

VaultX is currently a backend-first codebase for a self-hosted version control system. The repository is in an early implementation stage: the current work is focused on a Bun-based TypeScript backend, Express app wiring, CLI commands, and a data layer that is planned to use Prisma.

## Status

What exists now:

- Bun + TypeScript backend workspace under `Backend/`
- Express application bootstrap and health endpoint
- yargs command wiring for `init` and `add`
- Environment loading from `Backend/src/config/.env`
- Planned feature folders for future repository operations such as commit, pull, push, and revert

What is planned next:

- Prisma ORM for persistence and schema management
- Repository, branch, commit, and object storage workflows
- Proper command implementations instead of placeholder handlers
- API routes around the core VCS operations

## Repository Layout

```text
VaultX/
├── README.md
└── Backend/
    ├── package.json
    ├── tsconfig.json
    └── src/
        ├── api/
        │   ├── app.ts
        │   └── server.ts
        ├── config/
        ├── core/
        ├── infrastructure/
        │   └── commands/
        │       └── commands.ts
        ├── lib/
        │   ├── env.ts
        │   └── errors.ts
        └── modules/
            ├── add/
            │   └── add.command.ts
            ├── commit/
            ├── init/
            │   └── init.ts
            ├── pull/
            ├── push/
            └── revert/
```

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Bun |
| Language | TypeScript |
| HTTP API | Express |
| CLI parsing | yargs |
| ORM | Prisma, planned |
| Database | To be finalized |

## Current Behavior

The backend currently does the following:

- starts an Express app from `Backend/src/api/server.ts`
- enables JSON and URL-encoded request parsing
- applies CORS using `FRONTEND_URL` or `http://localhost:5173`
- exposes `GET /api/verify` as a simple health check
- registers `init` and `add <file>` CLI commands through yargs

The command handlers are still placeholders, so the repository is best treated as the foundation for the full product rather than a finished VCS.

## Getting Started

### Prerequisites

- Bun 1.x
- TypeScript-compatible editor support
- A local database will be needed once Prisma is wired in

### Install Dependencies

```bash
cd Backend
bun install
```

### Configure Environment

Create `Backend/src/config/.env` with at least:

```env
APP_PORT=5000
FRONTEND_URL=http://localhost:5173
```

`Backend/src/lib/env.ts` reads that file directly, so this path matters.

### Run the Server

```bash
cd Backend
bun run src/api/server.ts
```

The server logs a local URL using the configured port.

### Try the Current Health Check

```bash
curl http://localhost:5000/api/verify
```

Expected response:

```json
{ "health": "ok!" }
```

## Planned Prisma Setup

Prisma is the intended ORM for the next phase of the backend. The expected shape is:

- Prisma schema in a dedicated `prisma/` directory
- generated client used by future module handlers
- repository and commit data persisted through Prisma models
- database migrations managed through Prisma migration tooling

Until that layer is added, the codebase remains command and API scaffolding only.

## Roadmap

- repository initialization and local repository metadata
- file staging and add workflow
- commit history and snapshot storage
- branch and merge operations
- pull and push command implementations
- Prisma-backed persistence layer
- API surface for the core VCS actions

## Contributing

This project is still being shaped. When contributing, keep changes focused on the current backend architecture and avoid reintroducing the old MERN/AWS-only framing unless those pieces are actually implemented.

## License

This project is licensed under the MIT License.
