import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userData: { username: string; password: string }): Promise<User> {
    return this.usersService.register(userData.username, userData.password);
  }

  @Post('login')
  async login(@Body() userData: { username: string; password: string }): Promise<{ access_token: string }> {
    const user = await this.usersService.validateUser(userData.username, userData.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.usersService.login(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }
}