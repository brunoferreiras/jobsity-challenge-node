export default () => ({
  app: {
    name: 'Stocks App'
  },
  port: parseInt(process.env.PORT, 10) || 3040,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 27017,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  bcrypt: {
    salt: process.env.BCRYPT_SALT || 12,
  },
  stocks_service: {
    url: process.env.STOCKS_SERVICE_URL || 'http://stock:3000/api/v1'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10) || 3600,
  },
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || 'stockpass',
  },
  mail: {
    host: process.env.MAIL_HOST || 'mailhog',
    port: parseInt(process.env.MAIL_PORT, 10) || 1025,
    secure: process.env.MAIL_SECURE || false,
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
    from: process.env.MAIL_FROM || 'noreply@stocks.com'
  }
});
