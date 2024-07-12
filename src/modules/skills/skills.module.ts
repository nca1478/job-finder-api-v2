import { Module } from '@nestjs/common';
import { SkillsService } from './services/skills.service';
import { SkillsController } from './controllers/skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity } from './entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillEntity])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
