// src/usuarios/usuarios.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/Usuarios';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // 1. Inyectamos el "Repository" de Usuario.
  // Piensa en esto como la herramienta específica para hablar
  // con la tabla "usuarios" y nada más.
  constructor(
    @InjectRepository(Usuarios)
    private readonly usuarioRepository: Repository<Usuarios>,
  ) {}

  // 2. Creamos el método para buscar todos.
  // "async" significa que esta operación tomará tiempo.
  async findAll(): Promise<Usuarios[]> {
    // 3. Usamos la herramienta para encontrar todos los registros.
    // "await" le dice al código que espere aquí hasta que la base de datos responda.
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

    // 3. Crear la nueva instancia del usuario
    const nuevoUsuario = this.usuarioRepository.create({
      ...datosLimpios,
      email,
      nombreUsuario,
      claveHash: newHash
    });

    // 5. Guardar en la base de datos.
    await this.usuarioRepository.save(nuevoUsuario);

    const { claveHash, ...usuarioSinClaveHash } = nuevoUsuario;

    console.log('Usuario creado exitosamente:', usuarioSinClaveHash);
    return usuarioSinClaveHash;
  }
}