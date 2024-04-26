import { Module } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { EspecialidadController } from './especialidad.controller';
import { Especialidad } from './entities/especialidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Especialidad])],
  controllers: [EspecialidadController],
  providers: [EspecialidadService],
  exports: [TypeOrmModule],
})
export class EspecialidadModule {}
