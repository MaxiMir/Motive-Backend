```shell
npm i -g @nestjs/cli
nest new motive-backend
yarn add typeorm @nestjs/typeorm pg

# typeorm — пакет непосредственно с самой ORM
# @nestjs/typeorm — TypeORM пакет для NestJS. Добавляет модули для импортирования в модули проекта, а также набор декораторов-хелперов
# pg — драйвер для работы с PostgreSQL

# postgresql.conf конфиг для работы с подключениям по tcp

yarn add -D ts-node #  CLI написана на javascript и запускается в среде nodejs. Однако все наши модели и миграции будут написаны на typescript. Поэтому необходимо провести транспиляцию наших миграций и моделей до использования CLI. Для этого нам понадобится пакет ts-node:
```
В package.json:
```json
{
  "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js", // добавляет обертку в виде ts-node для запуска cli TypeORM
  "migration:generate": "yarn run typeorm migration:generate -n", // создание миграции на основе изменений в ваших моделях
  "migration:create": "yarn run typeorm migration:create -n", // создание пустой миграции
  "migration:run": "yarn run typeorm migration:run" // запуск миграций
}
```

```shell
yarn add @nestjsx/crud class-transformer class-validator


# @nestjsx/crud — базовый пакет, который предоставляет декоратор Crud() для генерации роутов, конфигурирования и валидации;
# @nestjsx/crud-request — пакет, предоставляющий билдер/парсер запросов для использования на стороне frontend;
# @nestjsx/crud-typeorm — пакет для интеграции с TypeORM, предоставляющий базовый сервис TypeOrmCrudService с CRUD методами работы с сущностями в БД.
```


### JOB

```shell
docker-compose up -d # запуск бд
npm start # запуск проекта

nest g module users # создание модуля users
nest g controller users/controllers/users # создание контроллера users

npm run migration:generate -- CreateUserTable # создать миграцию на основе изменений в моделях
```

### STATIC FILES:

```shell
npm i @nestjs/serve-static
```
В app.module.ts:
```typescript
ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'client'),
})
```
