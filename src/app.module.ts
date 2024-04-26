import { Module } from '@nestjs/common';
import { PacientesModule } from './pacientes/pacientes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicosModule } from './medicos/medicos.module';

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
  ],
})
export class AppModule {}
