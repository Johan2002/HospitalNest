import { IsString, MinLength } from "class-validator";

export class CreateEspecialidadDto {
  id: number;
  @IsString()
  @MinLength(1)
  name: string;

}
