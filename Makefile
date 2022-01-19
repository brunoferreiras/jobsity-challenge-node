up:
	docker-compose up -d

down:
	docker-compose down

up-stock:
	docker-compose up -d --build stock

up-stock-prod:
	docker-compose -f docker-compose-prod.yml up -d --build

down-stock-prod:
	docker-compose -f docker-compose-prod.yml down

down-stock:
	docker-compose down

logs-stock:
	docker-compose logs -f stock

bash-stock:
	docker-compose exec --user root stock bash

up-api:
	docker-compose up -d --build api

up-api-prod:
	docker-compose -f docker-compose-prod.yml up -d --build

down-api-prod:
	docker-compose -f docker-compose-prod.yml down

down-api:
	docker-compose down

logs-api:
	docker-compose logs -f api

bash-api:
	docker-compose exec --user root api bash

logs-mongo:
	docker-compose logs -f mongo

redis:
	docker-compose exec redis redis-cli -a stockpass