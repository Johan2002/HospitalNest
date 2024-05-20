import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Medico } from './entities/medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Especialidad } from 'src/especialidad/entities/especialidad.entity';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,

    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>,
  ) {}

  async create(createMedicoDto: CreateMedicoDto) {
    const especialidad = await this.especialidadRepository.findOne({
      where: { name: createMedicoDto.Especialidad },
    });

    if (!especialidad) {
      throw new BadRequestException('No existe esa especialidad.');
    }

    return await this.medicoRepository.save({
      ...createMedicoDto,
      especialidad,
    });
  }

  async findAll(): Promise<Medico[]> {
    const list = await this.medicoRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'Lista de medicos vacía.' });
    }
    return list;
  }

  async findOne(id: number): Promise<Medico> {
    const medico = await this.medicoRepository.findOneBy({ id: id });
    if (!medico) {
      throw new NotFoundException({ message: 'No existe este medico.' });
    }
    return medico;
  }

  async update(id: number, updateMedicoDto: UpdateMedicoDto): Promise<any> {
    const medico = await this.medicoRepository.findOne({ where: { id } });

    if (!medico) {
      throw new BadRequestException('Medico no existe.');
    }

    let especialidad;
    if (updateMedicoDto.Especialidad) {
      {
        especialidad = await this.especialidadRepository.findOne({
          where: { name: updateMedicoDto.Especialidad },
        });
      }

      if (!especialidad) {
        throw new BadRequestException('No se encuentra la especialidad.');
      }

      return await this.medicoRepository.save({
        ...medico,
        ...updateMedicoDto,
        especialidad,
      });
    }
  }

  async remove(id: number) {
    await this.medicoRepository.softDelete(+id);
    return { message: 'Medico eliminado.' };
  }
}
