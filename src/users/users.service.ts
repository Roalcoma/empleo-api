// src/usuarios/usuarios.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/Usuarios';

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

  async findOne(id: string): Promise<Usuarios | null> {
    return this.usuarioRepository.findOneBy({ id });
  }
}