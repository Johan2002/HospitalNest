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

  async update(id: number, updatePacienteDto: UpdatePacienteDto): Promise<any> {
    const paciente = await this.findOne(id);
    updatePacienteDto
      ? (paciente.Identificacion = updatePacienteDto.Identificacion)
      : (paciente.Identificacion = paciente.Identificacion);
    updatePacienteDto
      ? (paciente.Nombre = updatePacienteDto.Nombre)
      : (paciente.Nombre = paciente.Nombre);
    updatePacienteDto
      ? (paciente.Apellido = updatePacienteDto.Apellido)
      : (paciente.Apellido = paciente.Apellido);
    updatePacienteDto
      ? (paciente.Telefono = updatePacienteDto.Telefono)
      : (paciente.Telefono = paciente.Telefono);
    updatePacienteDto
      ? (paciente.Correo = updatePacienteDto.Correo)
      : (paciente.Correo = paciente.Correo);
    await this.usersRepository.save(paciente);
    return { message: 'Informacion del paciente actualizada.' };
  }

  async remove(id: number): Promise<any> {
    await this.usersRepository.delete(+id);
    return { message: 'Paciente eliminado.' };
  }
}
