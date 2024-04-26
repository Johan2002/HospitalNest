import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EspecialidadService {
  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
  ) {}

  async create(createEspecialidadDto: CreateEspecialidadDto) {
    const especialidad = this.especialidadRepository.create(
      createEspecialidadDto,
    );
    return await this.especialidadRepository.save(especialidad);
  }

  async findAll() {
    const list = await this.especialidadRepository.find();
    if (!list.length) {
      throw new NotFoundException({
        message: 'Lista de especialidades vacía.',
      });
    }
    return list;
  }

  async findOne(id: number) {
    const especialidad = await this.especialidadRepository.findOneBy({
      id: id,
    });
    if (!especialidad) {
      throw new NotFoundException({ message: 'No existe esta especialidad.' });
    }
    return especialidad;
  }

  async update(id: number, updateEspecialidadDto: UpdateEspecialidadDto) {
    const especialidad = await this.especialidadRepository.findOne({
      where: { id },
    });

    if (especialidad) {
      const especialidadActualizada = {
        ...especialidad,
        ...updateEspecialidadDto,
      };
      await this.especialidadRepository.save(especialidadActualizada);
      return { message: 'Especialidad actualizada exitosamente.' };
    } else {
      throw new NotFoundException({ message: 'No existe esta especialidad.' });
    }
  }

  async remove(id: number) {
    await this.especialidadRepository.softDelete(+id);
    return { message: 'Especialidad eliminada.' };
  }
}
