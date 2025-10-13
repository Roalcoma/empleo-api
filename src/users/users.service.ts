// src/usuarios/usuarios.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/Usuarios';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
  ) {}

  async findAll(): Promise<Usuarios[]> {
    return this.usuarioRepository.find();
  }

  async findOne(idUsuario: number): Promise<Usuarios | null> {
    return this.usuarioRepository.findOneBy({ idUsuario });
  }

  async create(CreateUsuarioDto: CreateUsuarioDto): Promise<any> {
    const { clave, email, nombreUsuario, ...datosLimpios } = CreateUsuarioDto;

    console.log('Datos recibidos para crear usuario:', CreateUsuarioDto);

    const usuarioExistente = await this.usuarioRepository.findOne({
      where: [{ email }, { nombreUsuario }],
    });

    if (usuarioExistente) {
      throw new ConflictException('El email o nombre de usuario ya están en uso.');
    }

    const salt = await bcrypt.genSalt();
    const newHash = await bcrypt.hash(clave, salt);


    const nuevoUsuario = this.usuarioRepository.create({
      ...datosLimpios,
      email,
      nombreUsuario,
      claveHash: newHash
    });

    
    await this.usuarioRepository.save(nuevoUsuario);

    const { claveHash, ...usuarioSinClaveHash } = nuevoUsuario;

    console.log('Usuario creado exitosamente:', usuarioSinClaveHash);
    return usuarioSinClaveHash;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<any> { 

    if (updateUsuarioDto.clave) {
      const salt = await bcrypt.genSalt();
      updateUsuarioDto.clave = await bcrypt.hash(updateUsuarioDto.clave, salt);
    }

    // 2. Usamos 'preload' para encontrar el usuario y fusionar los nuevos datos.
    // Es más eficiente que un findOne y luego un merge manual.
    const usuarioActualizado = await this.usuarioRepository.preload({
      idUsuario: id,
      ...updateUsuarioDto,
      claveHash: updateUsuarioDto.clave, // Mapeamos 'clave' a 'claveHash' si existe
    });

    // 3. Si preload no encuentra el usuario, devuelve undefined. Lanzamos un error.
    if (!usuarioActualizado) {
      throw new NotFoundException(`El usuario con el ID '${id}' no fue encontrado.`);
    }

    // 4. Guardamos los cambios en la base de datos.
    try {
      await this.usuarioRepository.save(usuarioActualizado);
    } catch (error) {
      // Manejamos el caso de que el email o nombre de usuario ya existan
      if (error.code === '23505') { // Código de error de PostgreSQL para violación de unicidad
        throw new ConflictException('El email o nombre de usuario ya está en uso.');
      }
      throw error;
    }

    const { claveHash, ...usuarioSinClaveHash } = usuarioActualizado;
    return usuarioSinClaveHash;
  }
}