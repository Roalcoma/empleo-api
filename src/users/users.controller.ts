import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get()
    findOne(@Query('idUsuario') id: string) {
        return this.usersService.findOne(id);
    }
}
