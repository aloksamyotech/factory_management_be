import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/common/dto/user/user.dto';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/common/dto/user/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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
    const key = process.env?.ACCESS_TOKEN_SECRET;
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

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
