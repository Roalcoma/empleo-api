import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perfiles } from './entities/perfiles.entity';
import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { CreateUpdatePerfilDto } from './dto/create-update-perfil.dto';

@Injectable()
export class PerfilesService {
    constructor(
        @InjectRepository(Perfiles)
        private readonly perfilesRepository: Repository<Perfiles>,
    ) {}

    async encontrarPerfilPorId(idUsuario: number): Promise<Perfiles> {
        const perfil = await this.perfilesRepository.findOne({ 
            where: { usuario: { idUsuario: idUsuario } } 
        });

        if (!perfil) {
            throw new NotFoundException(`Perfil no encontrado para el usuario con ID ${idUsuario}`);
        }

        return perfil;
    }

    async createOrUpdateMyProfile(usuario: Usuarios, dto: CreateUpdatePerfilDto): Promise<Perfiles> {
        
        // 1. Buscamos si ya existe un perfil para este usuario
        let perfil = await this.perfilesRepository.findOne({
          where: { usuario: { idUsuario: usuario.idUsuario } },
        });
    
        // 2. Si no existe, creamos una nueva instancia
        if (!perfil) {
          perfil = this.perfilesRepository.create({
            usuario: usuario, // Asociamos el perfil con el objeto de usuario completo
            ...dto,
          });
        } 
        // 3. Si ya existe, fusionamos los nuevos datos
        else {
          this.perfilesRepository.merge(perfil, dto);
        }
    
        // 4. Guardamos los cambios (sea creación o actualización)
        return this.perfilesRepository.save(perfil);
      }
}
