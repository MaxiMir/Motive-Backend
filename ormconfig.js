const process = require('process');

const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'example';

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username,
  password,
  database: 'postgres',
  synchronize: false,
  dropSchema: false,
  logging: true,
  entities: [
    __dirname + '/src/**/*.entity.ts',
    __dirname + '/dist/**/*.entity.js',
  ],
  migrations: ['migrations/**/*.ts'],
  subscribers: ['subscriber/**/*.ts', 'dist/subscriber/**/.js'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'migrations',
    subscribersDir: 'subscriber',
  },
};

/**
 synchronize — указывает, должна ли схема базы данных автоматически создаваться при запуске приложения. Будьте внимательны с данной опцией и не используйте ее в production, в противном случае вы потеряете данные. Данная опция удобна при разработке и отладке приложения. Как альтернатива данной опции, вы можете использовать команду schema:sync из CLI TypeORM.

 dropSchema — сбрасывать схему каждый раз, когда устанавливается соединение. Также, как и предыдущую, данную опцию следует использовать только в процессе разработки и отладки приложения.

 entities — по каким путям искать описание моделей. Обратите внимание, что поддерживается поиск по маске.

 cli.entitiesDir — директория, куда по умолчанию должны складываться модели, созданные из CLI TypeORM.
*/
