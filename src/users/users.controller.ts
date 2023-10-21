import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Get()
  getAll(@Query('page') page) {
    try {
      return this.usersService.getUsers(page);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const user = await this.usersService.getUserById(+id);
      return user;
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(+id, updateUserDto);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(+id);
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Post('auth/login')
  async login(@Body() user: { email: string; password: string }) {
    const token = await this.authService.generateJwtToken(user);
    return { user, access_token: token };
  }
}
