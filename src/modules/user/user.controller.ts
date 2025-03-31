import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from 'src/common/entities/user.entity';
import { CreateUserDto } from 'src/common/dto/user/user.dto';
import { LoginDto } from 'src/common/dto/user/login.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() user: Partial<User>,
  ): Promise<User | null> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post('login')
  login(@Body() login: LoginDto) {
    const res = this.usersService.login(login)
    return res
  }
}
