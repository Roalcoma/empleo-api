import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({
    path: 'usuarios',
    version: '1'
})
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get()
    findOne(@Query('idUsuario') id: number) {
        return this.usersService.findOne(id);
    }
}
