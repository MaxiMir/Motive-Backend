```shell
docker build -t maximir/backend:1.0.42 .
# artifactory:
docker tag <IMAGE_ID> maximir.jfrog.io/default-docker-virtual/backend:1.0.42
docker push maximir.jfrog.io/default-docker-virtual/backend:1.0.42
docker pull maximir.jfrog.io/default-docker-virtual/backend:1.0.42

docker-compose up -d # установка образа с бд

npm i -g @nestjs/cli
nest new motive-backend
yarn add typeorm @nestjs/typeorm pg

# typeorm — пакет непосредственно с самой ORM
# @nestjs/typeorm — TypeORM пакет для NestJS. Добавляет модули для импортирования в модули проекта, а также набор декораторов-хелперов
# pg — драйвер для работы с PostgresSQL

# postgresql.conf конфиг для работы с подключениям по tcp

yarn add -D ts-node #  CLI написана на javascript и запускается в среде nodejs. Однако все наши модели и миграции будут написаны на typescript. Поэтому необходимо провести транспиляцию наших миграций и моделей до использования CLI. Для этого нам понадобится пакет ts-node:
```

**В TypeOrmModule.forRoot:** 

**synchronize** — указывает, должна ли схема базы данных автоматически создаваться при запуске приложения.
Будьте внимательны с данной опцией и не используйте ее в production, в противном случае вы потеряете данные.
Данная опция удобна при разработке и отладке приложения.
Как альтернатива данной опции, вы можете использовать команду schema:sync из CLI TypeORM.

**dropSchema** — сбрасывать схему каждый раз, когда устанавливается соединение.
Также, как и предыдущую, данную опцию следует использовать только в процессе разработки и отладки приложения.

**entities** — по каким путям искать описание моделей. Обратите внимание, что поддерживается поиск по маске.

cli.entitiesDir — директория, куда по умолчанию должны складываться модели, созданные из CLI TypeORM.


**В package.json:**

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

**JOB**

```shell
yarn start # запуск проекта

nest g module user # создание модуля user
nest g controller user # создание контроллера user
nest g service user # создание сервиса user
# или:
nest g resource user # генерирует все разом 

yarn run migration:generate -- CreateUserTable # создать миграцию на основе изменений в моделях
yarn run migration:run # накатить миграцию
```

**STATIC FILES:**

```shell
yarn add @nestjs/serve-static
```
В app.module.ts:
```typescript
ServeStaticModule.forRoot({
  exclude: ['/api*'], // default folder - client
})
```

**VALIDATION**

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

[Type-safe File Uploads](https://notiz.dev/blog/type-safe-file-uploads)

### HELMET

```shell
yarn add helmet # для защиты приложения - передает специальные HTTP заголовки
```


### Subscribes:

```typescript
import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from 'typeorm';

@EventSubscriber()
export class ReactionSubscriber implements EntitySubscriberInterface<Reaction> {
  listenTo() {
    return Reaction;
  }

  afterInsert(event: InsertEvent<Reaction>) {
    const { id } = event.entity.user;
    event.manager
      .createQueryBuilder()
      .update(UserCharacteristic)
      .set({ followers: () => 'followers + 1' })
      .where('user.id = :id', { id })
      .execute();
  }
}
```
Сервисы в Subscriber:
```typescript
@Injectable()
@EventSubscriber()
export class GoalSubscriber implements EntitySubscriberInterface<Goal> {
  constructor(
    private readonly connection: Connection,
    private readonly subscriptionService: SubscriptionService,
  ) {
    connection.subscribers.push(this);
  }
}
```
