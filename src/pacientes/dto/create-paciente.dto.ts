import { IsEmail, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePacienteDto {
  id: number;
  @IsInt()
  @IsNotEmpty()
  Identificacion: number;
  @IsNotEmpty()
  Nombre: string;
  @IsNotEmpty()
  Apellido: string;
  @IsInt()
  @IsNotEmpty()
  Telefono: number;
  @IsEmail()
  @IsNotEmpty()
  Correo: string;
}
