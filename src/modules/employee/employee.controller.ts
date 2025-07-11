import { Controller, Get, Post, Param, Body, Put, Query } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { Employee } from "src/common/entities/employee.entity";
import { CreateEmployeeDto } from "src/common/dto/employee/createEmp.dto";
import { updateEmployeeDto } from "src/common/dto/employee/updateEmp.dto";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() employee: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(employee);
  }

  @Get()
  findAll(@Query("page") page: number = 1, @Query("limit") limit: number = 10) {
    return this.employeeService.find(page, limit);
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<CreateEmployeeDto | null> {
    return this.employeeService.findOne(id);
  }

  @Put(":id")
  update(
    @Param("id") id: number,
    @Body() employee: updateEmployeeDto,
  ): Promise<Employee | null> {
    return this.employeeService.update(id, employee);
  }
}
