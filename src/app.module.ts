import { Module } from '@nestjs/common';
import { PacientesModule } from './pacientes/pacientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicosModule } from './medicos/medicos.module';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'hospital',
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'], // cargar las entidades
      autoLoadEntities: true,
      synchronize: true,
    }),

    PacientesModule,

    MedicosModule,

    EspecialidadModule,

    UsersModule,

    AuthModule,
  ],
})
export class AppModule {}
