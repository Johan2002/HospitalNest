import { IsString, MinLength } from "class-validator";

export class CreateEspecialidadDto {

  @IsString()
  @MinLength(1)
  name: string;

}
