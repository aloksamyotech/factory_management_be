import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/common/constant/constant';
import { CreateEmployeeDto } from 'src/common/dto/employee/createEmp.dto';
import { updateEmployeeDto } from 'src/common/dto/employee/updateEmp.dto';
import { Employee } from 'src/common/entities/employee.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from 'src/common/dto/employee/login.dto';
import { Response } from 'express';
import { Res } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) { }

  async create(employee: CreateEmployeeDto) {
    const mailExist = await this.employeeRepository.findOne({
      where: { email: employee.email },
    });
    if (mailExist) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.BAD_REQUEST,
          message: Message.emailAlreadyRegistered,
          timestamp: new Date().toISOString(),
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const numberExist = await this.employeeRepository.findOne({
      where: { phoneNumber: employee.phoneNumber },
    });
    if (numberExist) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.BAD_REQUEST,
          message: Message.phoneNumberAlreadyRegistered,
          timestamp: new Date().toISOString(),
          data: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(employee.password, salt);
    employee.password = hashedPassword;

    const data = this.employeeRepository.create(employee);
    const newEmployee = this.employeeRepository.save(data);
    return newEmployee
  }

  async find(page: number, limit: number) {
    const data = await this.employeeRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
    return data;
  }

  async login(loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const employee = await this.employeeRepository.findOne({
      where: { email: loginDto.email },
    })

    if (!employee) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid Credentials',
          timestamp: new Date().toISOString(),
          data: [],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, employee.password);

    if (!isPasswordValid) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid Credentials',
          timestamp: new Date().toISOString(),
          data: [],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      id: employee?.id,
      email: employee?.email,
      name: `${employee?.firstName} ${employee?.lastName ? employee?.lastName : ''}`,
      department: employee?.department,
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1d' });
    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=60*60*12; SameSite=Strict`);

    const { password, ...employeeWithoutPassword } = employee;

    return {
      token,
      employeeWithoutPassword
    }
  }

  findOne(id: number) {
    const data = this.employeeRepository.findOne({ where: { id } });
    return data
  }

  update(id: number, employee: updateEmployeeDto) {
    const updated = this.employeeRepository.update(id, employee);
    const data = this.employeeRepository.findOne({ where: { id } });
    return data
  }
}
