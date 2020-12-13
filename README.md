# Item advertisement board application

![Node.js CI](https://github.com/pwr-piisw/board-project/workflows/Node.js%20CI/badge.svg)

## Development

### Requirements

- docker
- docker-compose
- make
- node

## Docker development

`Lerna` is used for managing precommit in monorepo. Formatting and linting job is added as a precommit hook.
To enable that run the command below in the root path:

```bash
npm ci
```

Setup api environment variables in [.env](./api/.env)

Setup dashboard environment variables in [.env](./frontend/.env)

Run all containers in development mode with:

```bash
make start-dev
```

Run all tests with:

```bash
make test
```

To get all the available commands with description use:

```bash
make help
```

## Local development

To enable precommit hooks in monorepo run the command below in the root path:

```bash
npm ci
```

### Dashboard

To start dashboard go to `frontend` directory.

```bash
cd frontend
```

Install dependencies with:

```bash
npm ci
```

Make sure all the envs in `.env` file have correct values.

Run app with:

```bash
npm start
```

### Api

Start mysql database instance.

To start dashboard go to `frontend` directory.

```bash
cd frontend
```

Install dependencies with:

```bash
npm ci
```

Create `.env` file from `local.env`.
Make sure all the envs have correct values.

Run app with:

```bash
npm run start:dev
```
