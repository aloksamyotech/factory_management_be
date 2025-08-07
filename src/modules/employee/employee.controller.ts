import { Controller, Get, Post, Param, Body, Put, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from 'src/common/dto/employee/createEmp.dto';
import { updateEmployeeDto } from 'src/common/dto/employee/updateEmp.dto';
import { LoginDto } from 'src/common/dto/employee/login.dto';
import { CheckToken } from 'src/common/guard/checkToken.guard';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  create(@Body() employee: CreateEmployeeDto) {
    return this.employeeService.create(employee);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.employeeService.login(loginDto, res);
  }
  @Get('logo')
  getLogo() {
    return this.employeeService.getLogo()
  }

  @Post('logo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: any, file: any, callback: any) => {
          const filename = Date.now() + path.extname(file.originalname);
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: any) {
    return this.employeeService.saveImageDetails(file)
  }
  
  @Put('logo')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: any, file: any, callback: any) => {
          const filename = Date.now() + path.extname(file.originalname);
          callback(null, filename);
        },
      }),
    }),
  )
  updateFile(@UploadedFile() file: any) {
    return this.employeeService.updateImageDetails(file)
  }

  // @UseGuards(CheckToken)
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.employeeService.find(page, limit);
  }

  // @UseGuards(CheckToken)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.employeeService.findOne(id);
  }

  // @UseGuards(CheckToken)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() employee: updateEmployeeDto,
  ) {
    return this.employeeService.update(id, employee);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('9x4kz5t7e2m1lqf', { path: '/' });
    return { message: 'Logged out' };
  }
}
