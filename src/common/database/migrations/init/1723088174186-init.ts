import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1723088174186 implements MigrationInterface {
    name = 'Init1723088174186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer_skills" DROP CONSTRAINT "FK_0ca41d2ded167c86e8b1ed06e98"`);
        await queryRunner.query(`ALTER TABLE "offer_skills" DROP CONSTRAINT "FK_3d64db624566af0359c40184063"`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" DROP CONSTRAINT "FK_fd9b22e0184a728807d56b4e40c"`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" DROP CONSTRAINT "FK_400289316db6f26cac56ff3104a"`);
        await queryRunner.query(`ALTER TABLE "offers" DROP CONSTRAINT "FK_dee629b1248f4ad48268faa9ea1"`);
        await queryRunner.query(`ALTER TABLE "skills" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "skills" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "offer_skills" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "offer_skills" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "sectors" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "sectors" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "published"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "published" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER_ROLE'`);
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
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "offers" DROP COLUMN "published"`);
        await queryRunner.query(`ALTER TABLE "offers" ADD "published" character varying NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "offers" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "sectors" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "sectors" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "offer_skills" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "offer_skills" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "skills" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "skills" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "offers" ADD CONSTRAINT "FK_dee629b1248f4ad48268faa9ea1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" ADD CONSTRAINT "FK_400289316db6f26cac56ff3104a" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer_sectors" ADD CONSTRAINT "FK_fd9b22e0184a728807d56b4e40c" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer_skills" ADD CONSTRAINT "FK_3d64db624566af0359c40184063" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer_skills" ADD CONSTRAINT "FK_0ca41d2ded167c86e8b1ed06e98" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
