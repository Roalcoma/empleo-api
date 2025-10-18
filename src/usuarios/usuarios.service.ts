// src/usuarios/usuarios.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/usuarios.entity';
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
    console.log('Buscando usuario con ID:', idUsuario);

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

    const usuarioActualizado = await this.usuarioRepository.preload({
      idUsuario: id,
      ...updateUsuarioDto,
      claveHash: updateUsuarioDto.clave, 
    });

    if (!usuarioActualizado) {
      throw new NotFoundException(`El usuario con el ID '${id}' no fue encontrado.`);
    }

    try {
      await this.usuarioRepository.save(usuarioActualizado);
    } catch (error) {
    
      if (error.code === '23505') { 
        throw new ConflictException('El email o nombre de usuario ya está en uso.');
      }
      throw error;
    }

    const { claveHash, ...usuarioSinClaveHash } = usuarioActualizado;
    return usuarioSinClaveHash;
  }

  async findByUsernameOrEmail(username: string): Promise<Usuarios | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: [{email: username}, {nombreUsuario: username}]
    })

    return usuario;
  }
}