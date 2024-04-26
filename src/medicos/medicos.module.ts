import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { Medico } from './entities/medico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadModule } from 'src/especialidad/especialidad.module';
import { EspecialidadService } from 'src/especialidad/especialidad.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medico]), EspecialidadModule],
  controllers: [MedicosController],
  providers: [MedicosService, EspecialidadService],
  exports: [],
})
export class MedicosModule {}
