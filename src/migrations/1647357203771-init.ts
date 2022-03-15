import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1647357203771 implements MigrationInterface {
  name = 'init1647357203771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "days" ALTER COLUMN "date" SET DEFAULT 'TOMORROW'`);
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "motivation" TYPE double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "creativity" TYPE double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "support" TYPE double precision`,
    );
    await queryRunner.query(`ALTER TABLE "goals" ALTER COLUMN "started" SET DEFAULT 'TODAY'`);
    await queryRunner.query(`ALTER TABLE "confirmations" ALTER COLUMN "date" SET DEFAULT 'TODAY'`);
    await queryRunner.query(`ALTER TABLE "days" ALTER COLUMN "date" SET DEFAULT 'TOMORROW'`);
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "motivation" TYPE double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "creativity" TYPE double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "support" TYPE double precision`,
    );
    await queryRunner.query(`ALTER TABLE "goals" ALTER COLUMN "started" SET DEFAULT 'TODAY'`);
    await queryRunner.query(`ALTER TABLE "confirmations" ALTER COLUMN "date" SET DEFAULT 'TODAY'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "confirmations" ALTER COLUMN "date" SET DEFAULT '2022-03-15 00:00:00+03'`,
    );
    await queryRunner.query(
      `ALTER TABLE "goals" ALTER COLUMN "started" SET DEFAULT '2022-03-15 00:00:00+03'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "support" TYPE double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "creativity" TYPE double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "motivation" TYPE double precision`,
    );
    await queryRunner.query(`ALTER TABLE "days" ALTER COLUMN "date" SET DEFAULT '2022-03-16 00:00:00+03'`);
    await queryRunner.query(
      `ALTER TABLE "confirmations" ALTER COLUMN "date" SET DEFAULT '2022-03-15 00:00:00+03'`,
    );
    await queryRunner.query(
      `ALTER TABLE "goals" ALTER COLUMN "started" SET DEFAULT '2022-03-15 00:00:00+03'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "support" TYPE double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "creativity" TYPE double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-characteristics" ALTER COLUMN "motivation" TYPE double precision`,
    );
    await queryRunner.query(`ALTER TABLE "days" ALTER COLUMN "date" SET DEFAULT '2022-03-16 00:00:00+03'`);
  }
}
