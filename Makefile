up-stock:
	docker-compose up -d --build

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