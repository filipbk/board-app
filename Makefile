include backend/.env
export $(shell sed 's/=.*//' backend/.env)

help:
	@grep -P '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build-prod: ## Build production docker containers
	docker-compose -f docker-compose.prod.yml build

build-dev: ## Build development docker containers
	docker-compose -f docker-compose.dev.yml build

start-prod: ## Start production docker containers
	docker-compose -f docker-compose.prod.yml up -d

start-dev: ## Start development docker containers
	docker-compose -f docker-compose.dev.yml up -d

stop-prod: ## Stop development docker containers
	docker-compose -f docker-compose.prod.yml stop

stop-dev: ## Stop development docker containers
	docker-compose -f docker-compose.dev.yml stop

lint-api: ## Lint api code
	docker-compose -f docker-compose.dev.yml exec api npm run lint

lint-dashboard: ## Lint dashboard code
	docker-compose -f docker-compose.dev.yml exec dashboard npm run lint

test-api: ## Run all api tests
	docker-compose -f docker-compose.dev.yml exec api npm test

test-dashboard: ## Run all dashboard tests
	docker-compose -f docker-compose.dev.yml exec -w /app dashboard bash -c 'CI=true npm test'

test: test-api test-dashboard

prepare-dev-db:
	docker-compose -f docker-compose.dev.yml exec -T mysql mysql -u ${DATABASE_USERNAME} -p${DATABASE_PASSWORD} '${DATABASE_NAME}' < ./scripts/prepare-db.sql

prepare-dev-db:
	docker-compose -f docker-compose.prod.yml exec -T mysql mysql -u ${DATABASE_USERNAME} -p${DATABASE_PASSWORD} '${DATABASE_NAME}' < ./scripts/prepare-db.sql