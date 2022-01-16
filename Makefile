up-stock:
	docker-compose up -d

logs-stock:
	docker-compose logs -f stock

bash-stock:
	docker-compose exec --user root stock bash