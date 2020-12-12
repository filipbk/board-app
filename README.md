# Item advertisement board application

![Node.js CI](https://github.com/pwr-piisw/board-project/workflows/Node.js%20CI/badge.svg)

## Development

### Requirements

- docker
- docker-compose
- make
- node v12.18.0

To enable precommit hooks in monorepo run the command below in the root path:

```bash
npm ci
```

To get all the available make commands with description use:

```bash
make help
```

## Docker development

### Development version

Setup api environment variables in [.env](./backend/.env)
Templates from files [dev.env](./backend/dev.env), [production.env](./backend/production.env)

Setup dashboard environment variables in [.env](./frontend/.env)

Run all containers in development mode with:

```bash
make start-dev
```

Prepare db structure:

```bash
make prepare-dev-db
```

Run all tests with:

```bash
make test
```

### Production version

Run all containers in production mode with:

```bash
make start-prod
```

Prepare db structure:

```bash
make prepare-prod-db
```

## Local development

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

Setup api environment variables in [.env](./backend/.env)
Templates from files [local.env](./backend/local.env), [heroku.env](./backend/heroku.env)

Make sure all the environmental variables have correct values.

If a local database prepare it by running the following command in the root directory.

```bash
make prepare-prod-db
```

To start dashboard go to `backend` directory.

```bash
cd backend
```

Install dependencies with:

```bash
npm ci
```

Run app with:

```bash
npm run start:dev
```

## Initializing the first admin user

1. After starting the api for the first time an admin token is visible in the stdout (api logs).
2. Save the token.
3. Visit the dashboard on `localhost` and log in.
4. Send a POST request to `${API_URL}/auth/token/admin` endpoint with the following json body:
```json
{
    "token": "$ADMIN_TOKEN",
    "email": "$USER_EMAIL"
}
```
replacing variables with proper values.

Example:
```bash
curl --location --request POST 'localhost:3000/auth/token/admin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "your-email@gmail.com",
    "token": "an-admin-token"
}'
```
5. Login again to the dashboard and Your account now has admin privileges