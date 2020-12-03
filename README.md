# Item advertisement board application

![Node.js CI](https://github.com/pwr-piisw/board-project/workflows/Node.js%20CI/badge.svg)

## Development

### Requirements

- docker
- docker-compose
- make

### Usage

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
