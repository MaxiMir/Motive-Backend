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
docker-compose up -d # установка образа с бд
yarn start # запуск проекта

nest g module user # создание модуля user
nest g controller user # создание контроллера user
nest g service user # создание сервиса user
# или:
nest g resource user # генерирует все разом 

yarn run migration:generate -- CreateUserTable # создать миграцию на основе изменений в моделях
yarn run migration:run # накатить миграцию
```

### STATIC FILES:

```shell
yarn add @nestjs/serve-static
```
В app.module.ts:
```typescript
ServeStaticModule.forRoot({
  exclude: ['/api*'], // default floder - client
})
```

### VALIDATION

```shell
yarn add class-validator class-transformer # https://docs.nestjs.com/techniques/validation
```
В `main.js`:
```shell
app.useGlobalPipes(new ValidationPipe()); # устанавливаем pipe на все endpoints
````
*pipe* - отвечают за преобразование или валидацию входных данных

### FILES:

```shell
yarn add -D @types/multer # Nest uses multer for handling file uploads using the multipart/form-data format.
```


### HELMET

```shell
yarn add helmet # для защиты приложения - передает специальные HTTP заголовки
```
