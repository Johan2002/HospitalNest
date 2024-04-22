import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { Medico } from './entities/medico.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MedicosService {
  constructor(
    @InjectRepository(Medico)
    private readonly usersRepository: Repository<Medico>,
  ) {}

  async create(createMedicoDto: CreateMedicoDto): Promise<any> {
    const medico = this.usersRepository.create(createMedicoDto);
    await this.usersRepository.save(medico);
    return { message: 'Medico creado exitosamente.' };
  }

  async findAll(): Promise<Medico[]> {
    const list = await this.usersRepository.find();
    if (!list.length) {
      throw new NotFoundException({ message: 'Lista de medicos vacía.' });
    }
    return list;
  }

  async findOne(id: number): Promise<Medico> {
    const medico = await this.usersRepository.findOneBy({ id: id });
    if (!medico) {
      throw new NotFoundException({ message: 'No existe este medico.' });
    }
    return medico;
  }

  async update(id: number, updateMedicoDto: UpdateMedicoDto): Promise<any> {
    const medico = await this.findOne(id);
    updateMedicoDto
      ? (medico.Identificacion = updateMedicoDto.Identificacion)
      : (medico.Identificacion = medico.Identificacion);
    updateMedicoDto
      ? (medico.Nombre = updateMedicoDto.Nombre)
      : (medico.Nombre = medico.Nombre);
    updateMedicoDto
      ? (medico.Apellido = updateMedicoDto.Apellido)
      : (medico.Apellido = medico.Apellido);
    updateMedicoDto
      ? (medico.Telefono = updateMedicoDto.Telefono)
      : (medico.Telefono = medico.Telefono);
    updateMedicoDto
      ? (medico.Correo = updateMedicoDto.Correo)
      : (medico.Correo = medico.Correo);
    await this.usersRepository.save(medico);
    return { message: 'Informacion del medico actualizada.' };
  }

  async remove(id: number): Promise<any> {
    await this.usersRepository.delete(+id);
    return { message: 'Medico eliminado.' };
  }
}
