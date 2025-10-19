import { Injectable, NotFoundException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Educacion } from './entities/educacion.entity';
import { CreateEducacionDto } from './dto/create-educacion.dto';
import { UpdateEducacionDto } from './dto/update-educacion.dto';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { Perfiles } from 'src/perfiles/entities/perfiles.entity';

@Injectable()
export class EducacionService {
    constructor(
        @InjectRepository(Educacion)
        private readonly educacionRepository: Repository<Educacion>,
        @InjectRepository(Perfiles)
        private readonly perfilesRepository: Repository<Perfiles>,
    ) {}

    private async getUserProfileOrFail(user: Usuarios): Promise<Perfiles> {
        // Si la relación 'perfil' no fue cargada por la JwtStrategy, la buscamos.
        // Es más eficiente cargarla en la Strategy si siempre la vas a necesitar.
        const perfil = user.perfiles ?? await this.perfilesRepository.findOneBy({ usuario: { idUsuario: user.idUsuario } });
    
        if (!perfil) {
          // Este error no debería pasar si la lógica de registro crea un perfil,
          // pero es una buena validación defensiva.
          throw new InternalServerErrorException(`El usuario ${user.nombreUsuario} no tiene un perfil asociado.`);
        }
        return perfil;
    }

    async create(createEducacionDto: CreateEducacionDto, user: Usuarios): Promise<Educacion> {
        const perfil = await this.getUserProfileOrFail(user);
    
        const nuevaEducacion = this.educacionRepository.create({
          ...createEducacionDto,
          perfil: perfil, // Asociamos directamente con el objeto Perfil
        });
    
        return this.educacionRepository.save(nuevaEducacion);
    }
}
