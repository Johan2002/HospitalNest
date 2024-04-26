import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMedicoDto {
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
  @IsString()
  @IsOptional()
  Especialidad: string;
}
