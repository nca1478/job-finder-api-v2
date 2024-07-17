import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1721185054812 implements MigrationInterface {
    name = 'Init1721185054812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "offer_skills" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "offerId" uuid, "skillId" uuid, CONSTRAINT "PK_7cb9b9b09e836de89815d23ba94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sectors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_923fdda0dc12f59add7b3a1782f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "offer_sectors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "offerId" uuid, "sectorId" uuid, CONSTRAINT "PK_ab690342033461276ca8f0fc59f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "offers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" text NOT NULL, "country" character varying, "state" character varying, "city" character varying, "price" numeric NOT NULL DEFAULT '0', "currency" character varying NOT NULL, "img" character varying, "published" boolean NOT NULL DEFAULT false, "active" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_4c88e956195bba85977da21b8f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN_ROLE', 'USER_ROLE')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER_ROLE', "img" text, "google" boolean NOT NULL DEFAULT false, "facebook" boolean NOT NULL DEFAULT false, "tokenRecovery" text, "birthday" date, "profession" character varying, "education" character varying, "cvUrl" text, "linkedinUser" character varying, "twitterUser" character varying, "instagramUser" character varying, "facebookUser" character varying, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "offer_skills" ADD CONSTRAINT "FK_0ca41d2ded167c86e8b1ed06e98" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer_skills" ADD CONSTRAINT "FK_3d64db624566af0359c40184063" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" ADD CONSTRAINT "FK_fd9b22e0184a728807d56b4e40c" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" ADD CONSTRAINT "FK_400289316db6f26cac56ff3104a" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_dee629b1248f4ad48268faa9ea1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_dee629b1248f4ad48268faa9ea1"`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" DROP CONSTRAINT "FK_400289316db6f26cac56ff3104a"`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" DROP CONSTRAINT "FK_fd9b22e0184a728807d56b4e40c"`);
        await queryRunner.query(`ALTER TABLE "offer_skills" DROP CONSTRAINT "FK_3d64db624566af0359c40184063"`);
        await queryRunner.query(`ALTER TABLE "offer_skills" DROP CONSTRAINT "FK_0ca41d2ded167c86e8b1ed06e98"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "offers"`);
        await queryRunner.query(`DROP TABLE "offer_sectors"`);
        await queryRunner.query(`DROP TABLE "sectors"`);
        await queryRunner.query(`DROP TABLE "offer_skills"`);
        await queryRunner.query(`DROP TABLE "skills"`);
    }

}
