# Stock - Node.js Challenge
## Gettings Started
It's need to install in your computer:
`Docker: 18.06.0+`
`Docker-compose: 1.27.0+`

## Framework / Tools
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Mailhog](https://github.com/mailhog/MailHog)

## Start project
```bash
// Create the .env file to api-service
cp ./api-service/.env.example ./api-service/.env
// Start all containers docker
make up
// It's everything!
```
You can access the services:
- Mailhog: [http://localhost:8025](http://localhost:8025)
- Api Service (External): [http://localhost:3040](http://localhost:3040)
- Stock Service (Internal): [http://localhost:3041](http://localhost:3041)

## Postman Collection
You can use the postman collection in `docs/stock-quote.postman_collection.json`

## Stock Service (Internal)
This service is running in [http://localhost:3041](http://localhost:3041).

The Swagger docs is running in [http://localhost:3041/docs/api](http://localhost:3041/docs/api).

You can execute some commands:
```bash
// Enter in container docker
make bash-stock
### Inside on container
yarn test // Running all the unit/feature tests
yarn test:cov // Running the coverage code. Output is ./coverage
yarn test:e2e // Running the end-to-end tests.
```

## Api Service (External)
This service is running in [http://localhost:3040](http://localhost:3040).

The Swagger docs is running in [http://localhost:3040/docs/api](http://localhost:3040/docs/api).

You can execute some commands:
```bash
// Enter in container docker
make bash-api
### Inside on container
yarn test // Running all the unit/feature tests
yarn test:cov // Running the coverage code. Output is ./coverage
yarn test:e2e // Running the end-to-end tests.
```

## Mailhog
This service is running in [http://localhost:8025](http://localhost:8025).
It's responsible to can see the emails when using the recover password.

