const process = require('process');

const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username,
  password,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  dropSchema: false,
  entities: [__dirname + '/src/**/*.entity.ts', __dirname + '/dist/**/*.entity.js'],
  migrations: [__dirname + '/src/migrations/**/*.ts'],
  subscribers: ['subscriber/**/*.ts', 'dist/subscriber/**/.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
    subscribersDir: 'subscriber',
  },
};
