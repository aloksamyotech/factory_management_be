import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/common/dto/user/user.dto';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/common/dto/user/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phoneNumber } = createUserDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      phoneNumber,
    });
    const newUser = await this.usersRepository.save(user);
    return newUser;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return {
        statusCode: 400,
        message: 'Email not found',
        data: [],
      };
    }

    const passVerify = await bcrypt.compare(password, user.password);
    if (!passVerify) {
      return {
        statusCode: 400,
        message: 'Wrong Password',
        data: [],
      };
    }

    const payload = { user };
    const key = this.configService.get('ACCESS_TOKEN_SECRET');
    const token = this.jwtService.sign(payload, {
      secret: key,
      expiresIn: '1d',
    });

    return {
      statusCode: 200,
      message: 'login successfull',
      data: token,
    };
  }

  async findAll() {
    const data = await this.usersRepository.find();
    return data
  }

  async findOne(id: number) {
    const data = this.usersRepository.findOne({ where: { id } });
    return data
  }

  async update(id: number, user: Partial<User>) {
    await this.usersRepository.update(id, user);
    const data = await this.usersRepository.findOne({ where: { id } });
    return data
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
