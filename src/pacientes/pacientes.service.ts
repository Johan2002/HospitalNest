import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly usersRepository: Repository<Paciente>,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<any> {
    const paciente = this.usersRepository.create(createPacienteDto);
    await this.usersRepository.save(paciente);
    return { message: 'Paciente creado exitosamente.' };
  }

  async findAll(): Promise<Paciente[]> {
    const list = await this.usersRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'Lista de pacientes vacía.' });
    }
    return list;
  }

  async findOne(id: number): Promise<Paciente> {
    const paciente = await this.usersRepository.findOneBy({ id: id });
    if (!paciente) {
      throw new NotFoundException({ message: 'No existe este paciente.' });
    }
    return paciente;
  }

  async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    const paciente = await this.usersRepository.findOne({ where: { id } });

    if (paciente) {
      const pacienteActualizado = {
        ...paciente,
        ...updatePacienteDto,
      };
      await this.usersRepository.save(pacienteActualizado);
      return { message: 'Paciente actualizado exitosamente.' };
    } else {
      throw new NotFoundException({ message: 'No existe este paciente.' });
    }
  }

  async remove(id: number): Promise<any> {
    await this.usersRepository.softDelete(+id);
    return { message: 'Paciente eliminado.' };
  }
}
