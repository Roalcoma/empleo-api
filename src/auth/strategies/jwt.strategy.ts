// src/auth/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/usuarios/usuarios.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || (() => { throw new Error('JWT_SECRET is not defined'); })(),
    });
  }

  async validate(payload: { id: number; username: string }) {
    const { id } = payload;
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new UnauthorizedException('Token no válido');
    }

    // Lo que retornes aquí se adjuntará al objeto `request` como `req.user`
    return user;
  }
}