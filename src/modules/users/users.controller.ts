import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { FiltersDto } from './dto/filters.dto';
import { IUsersService } from './interfaces/users-service.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: IUsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('jwt-auth')
  @Get()
  findAll(@Req() req, @Query() filters?: FiltersDto) {
    return this.usersService.findAll(filters);
  }
}
